const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update as needed
    methods: ["GET", "POST"],
  },
});

// In-memory data stores
let onlineUsers = {};       // socket.id -> username
let users = {};             // username -> socket.id
let chatHistory = [];       // Fake DB for messages

// 🔁 Main Namespace
io.on("connection", (socket) => {
  console.log(`✅ Connected: ${socket.id}`);

  // User joins
  socket.on("new_user", (username) => {
    socket.username = username;
    onlineUsers[socket.id] = username;
    users[username] = socket.id;

    io.emit("online_users", Object.values(onlineUsers));
    console.log(`🟢 ${username} joined`);
  });

  // Global message
  socket.on("send_message", (data, ack) => {
    io.emit("receive_message", data);
    chatHistory.push({ ...data, room: "global" });
    console.log(`💬 Global | ${data.sender}: ${data.text}`);
    if (ack) ack({ status: "delivered", id: data.id });
  });

  // Typing indicator
  socket.on("typing", (isTyping) => {
    socket.broadcast.emit("typing", isTyping);
  });

  // Private message
  socket.on("private_message", ({ to, message }) => {
    const toId = users[to];
    if (toId) {
      io.to(toId).emit("receive_private_message", {
        from: socket.username,
        message,
        timestamp: new Date().toLocaleTimeString(),
      });
      console.log(`📩 Private | ${socket.username} ➡️ ${to}`);
    }
  });

  // Room joining
  socket.on("join_room", (room) => {
    socket.join(room);
    io.to(room).emit("room_notification", `${socket.username} joined ${room}`);
    console.log(`🏠 ${socket.username} joined room: ${room}`);
  });

  // Room messaging
  socket.on("room_message", ({ room, message, sender }) => {
    const msg = {
      room,
      sender,
      message,
      timestamp: new Date().toLocaleTimeString(),
    };
    chatHistory.push(msg);
    io.to(room).emit("receive_room_message", msg);
    console.log(`🏠 Room ${room} | ${sender}: ${message}`);
  });

  // File sharing
  socket.on("send_file", (data) => {
    io.emit("receive_file", data);
    console.log(`📎 File from ${socket.username}: ${data.fileName}`);
  });

  // Message read
  socket.on("message_read", (id) => {
    io.emit("message_read_ack", id);
  });

  // Reaction
  socket.on("add_reaction", ({ id, reaction }) => {
    io.emit("reaction_update", { id, reaction });
    console.log(`😄 Reaction on message ${id}: ${reaction}`);
  });

  // Chat history (pagination)
  socket.on("get_messages", ({ room, offset = 0, limit = 20 }) => {
    const messages = chatHistory
      .filter((msg) => msg.room === room)
      .slice(-offset - limit, -offset || undefined);
    socket.emit("messages_batch", messages);
  });

  // Disconnect
  socket.on("disconnect", () => {
    const username = onlineUsers[socket.id];
    delete users[username];
    delete onlineUsers[socket.id];
    io.emit("online_users", Object.values(onlineUsers));
    io.emit("room_notification", `${username || "Unknown"} left the chat`);
    console.log(`🔴 ${username || "Unknown user"} disconnected`);
  });
});

// 🌐 Namespace Example
const chatNamespace = io.of("/chat");

chatNamespace.on("connection", (socket) => {
  console.log(`🌐 Namespace /chat: ${socket.id} connected`);

  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("message", ({ room, ...data }) => {
    chatNamespace.to(room).emit("message", data);
  });
});

// ✅ Root Test
app.get("/", (req, res) => {
  res.send("🚀 Presidoo Chat Server is Running!");
});

// 🚀 Start Server
server.listen(3001, () => {
  console.log("🌍 Server running at http://localhost:3001");
});

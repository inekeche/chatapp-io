# 💬 Real-Time Chat App with Socket.io

A full-featured real-time chat application built with **Node.js**, **Express**, **React**, and **Socket.io**, supporting global chat, private messages, chat rooms, file sharing, typing indicators, and real-time notifications.

---

## 🚀 Project Objective

Demonstrate **real-time, bidirectional communication** using Socket.io by building a chat system with advanced user experience features including typing indicators, file sharing, read receipts, notifications, and message delivery tracking.

---

## 📂 Project Structure & Tasks

### ✅ Task 1: Project Setup

- [x] Setup Node.js server with Express
- [x] Integrate Socket.io on server
- [x] Create React front-end app
- [x] Connect Socket.io client to server
- [x] Establish communication flow

### 💬 Task 2: Core Chat Functionality

- [x] Username-based login (prompt)
- [x] Global chat room for all users
- [x] Display messages with username & timestamp
- [x] Typing indicators
- [x] Online/offline status for users

### 🌟 Task 3: Advanced Chat Features

- [x] Private 1-on-1 messaging
- [x] Multiple room/channel support
- [x] File sharing (image/doc as base64)
- [x] Read receipts
- [x] Message reactions (like ❤️, 👍)

### 🔔 Task 4: Real-Time Notifications

- [x] Message received alerts (sound)
- [x] Room join/leave notifications
- [x] Unread message count
- [x] Browser notifications via Web Notifications API

### ⚙️ Task 5: Performance & UX Enhancements

- [x] Message pagination (load more on scroll)
- [x] Reconnection handling (auto-resubscribe)
- [x] Message delivery acknowledgment (client/server)
- [x] Message search/filter
- [x] Responsive layout for mobile & desktop

---

## 🧪 Expected Outcome

- ✅ Seamless real-time chat experience
- ✅ Multiple chat features supported across users and rooms
- ✅ Smooth typing, notifications, and delivery tracking
- ✅ Clean and responsive UI

---

## 🛠️ Technologies Used

| Stack        | Tools                         |
|--------------|-------------------------------|
| Frontend     | React, Socket.io-client       |
| Backend      | Node.js, Express, Socket.io   |
| Real-Time    | WebSockets via Socket.io      |
| UX Features  | Web Notifications, Audio API  |
| Optional     | LocalStorage, React Hooks     |

---

## ⚙️ Installation & Run Locally

### 📦 Backend (Express + Socket.io)

```bash
cd server
npm install
node index.js
💻 Frontend (React App)

cd client
npm install
npm start
Ensure both the frontend and backend are running on the appropriate ports (3000 for React, 3001 for server by default).

🖼️ Screenshots
Include UI screenshots of global chat, private message, room messages, typing indicators, file uploads, etc.


![image](https://github.com/user-attachments/assets/6349d80f-e1e3-482c-bc8f-3b488c616686)




📌 Future Improvements
User authentication with JWT & protected routes

Chat history persistence with a database (e.g. MongoDB)

Admin dashboard for moderation

Emoji support and themes

📄 License
MIT License. Use freely and modify for learning or production needs.

🙌 Acknowledgments
Built as part of Week 5: Real-Time Communication with Socket.io project exercise. Inspired by modern chat apps like WhatsApp, Slack, and Messenger.



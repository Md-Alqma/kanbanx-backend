# KanbanX Backend

## 📌 Project Overview
The **KanbanX Backend** is a RESTful API built using the **MERN stack** to power a **Kanban Board** application. This backend provides authentication, task management, and board functionalities.

---

## 🚀 Features
- **User Authentication** (Register, Login, Logout)
- **User Authorization** (JWT-based authentication, protected routes)
- **Board Management** (Create, update, delete boards)
- **List Management** (Create, update, delete lists within boards)
- **Task Management** (Create, update, delete, move tasks across lists)
- **Drag and Drop Support**
- **Database Integration** (MongoDB with Mongoose ORM)
- **Secure Cookie-based Authentication**
- **RESTful API with Express.js**

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **State Management**: Zustand (Frontend Integration)
- **Security**: CORS, Helmet

---

## 📂 Folder Structure
```diff
backend/
│── controllers/     # Business logic for authentication, boards, lists, and tasks
│── middlewares/     # Middleware for authentication and error handling
│── models/          # Mongoose schema definitions
│── routes/          # API route definitions
│── config/          # Database and environment configurations
│── .env             # Environment variables
│── server.js        # Entry point for the application
│── package.json     # Dependencies and scripts
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Md-Alqma/KanbanX-backend.git
cd KanbanX-backend
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add the following:
```ini
PORT=5000
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
CLIENT_URL=http://localhost:5173
```
### 4️⃣ Start the Server
```sh
npm start
```
By default, the server will run on http://localhost:5000.

---
## 📌 API Endpoints

### 🔹 Authentication
| Method | Endpoint       | Description              |
|--------|--------------|--------------------------|
| **POST**   | `/auth/register` | Register a new user |
| **POST**   | `/auth/login`    | Login user & get token |
| **POST**   | `/auth/logout`   | Logout user |
| **GET**    | `/auth/user`     | Get logged-in user details |

### 🔹 Board Management
| Method | Endpoint          | Description               |
|--------|------------------|---------------------------|
| **POST**   | `/boards/`         | Create a new board        |
| **GET**    | `/boards/`         | Get all user boards       |
| **GET**    | `/boards/:id`      | Get single board        |
| **PUT**  | `/boards/:id`      | Update board details      |
| **DELETE** | `/boards/:id`      | Delete a board            |

### 🔹 List Management
| Method | Endpoint          | Description               |
|--------|------------------|---------------------------|
| **POST**   | `/lists/`          | Create a new list        |
| **PUT**  | `/lists/:id`       | Update list details      |
| **DELETE** | `/lists/:id`       | Delete a list            |

### 🔹 Task Management
| Method | Endpoint          | Description               |
|--------|------------------|---------------------------|
| **POST**   | `/tasks/`          | Create a new task        |
| **GET**  | `/tasks/:id`       | Get single task          |
| **PUT**  | `/tasks/:id`       | Update task details      |
| **DELETE** | `/tasks/:id`       | Delete a task            |
| **PUT**  | `/tasks/:id/move`  | Move task to another list |



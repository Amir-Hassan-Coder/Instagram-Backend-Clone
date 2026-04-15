# 📸 Instagram Backend Clone (Node.js)

A fully functional Instagram-like backend built using Node.js, Express, and MongoDB.  
This project demonstrates real-world backend concepts including authentication, authorization, and social media features.

---

## 🚀 Features

- 🔐 User Authentication (JWT + Cookies)
- 👤 User Profile Management
- 🔁 Follow / Unfollow Users
- 📝 Create, Update, Delete Posts
- ❤️ Like / Unlike Posts
- 💬 Comment System (Add & Delete Comments)
- 🔒 Ownership-based Authorization (Users can only modify their own data)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcrypt.js (Password Hashing)

---

## 📂 Project Structure
project/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── app.js
└── server.js



---

## 🔐 Authentication Flow

1. User logs in → JWT token generated  
2. Token stored in cookies  
3. Middleware verifies token  
4. `req.user` is available in protected routes  

---

## 🧠 Key Learnings

- How real-world backend systems work
- Secure authentication & authorization
- REST API development
- Database relationships (User ↔ Post ↔ Comment)
- Writing clean and scalable backend code

---

## 📌 API Endpoints (Examples)

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### User
- GET `/api/user/me`
- PUT `/api/user/update`
- POST `/api/user/follow/:id`

### Posts
- POST `/api/posts`
- GET `/api/posts`
- PUT `/api/posts/:id`
- DELETE `/api/posts/:id`

### Comments
- POST `/api/comments/:postId`
- DELETE `/api/comments/:commentId`

---




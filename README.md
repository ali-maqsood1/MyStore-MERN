# 💼 MyStore - MERN Stack E-commerce App (Basic)

A full-stack E-commerce web application built using the **MERN (MongoDB, Express, React, Node.js)** stack. Users can **sign up**, **log in**, and **manage products** in a modern, mobile-responsive UI powered by **Chakra UI**.

---

## ✨ Features

### 🔐 Authentication

* Secure **Sign Up** and **Login** pages
* Basic email & password validation
* password encryption
* Frontend form validation
* Auth routes protected with proper backend structure

### 📦 Product Management

* Add new products (with title, price, image)
* View all products
* Each product shown in a responsive card

### 🌐 Full Stack Integration

* **Frontend:** React + Chakra UI + React Router DOM
* **Backend:** Node.js + Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **HTTP Client:** Axios abstraction with dynamic `baseURL`

### 📡 API Routes

| Method | Route              | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/auth/signup` | Register a new user     |
| POST   | `/api/auth/login`  | Log in an existing user |
| GET    | `/api/products`    | Fetch all products      |
| POST   | `/api/products`    | Add a new product       |

---

## 📁 Project Structure

```
MyStore-MERN/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── utils/api.js
│   └── main.jsx
├── .env
├── package.json (root + frontend)
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔧 Local Development

1. **Clone the repo:**

   ```bash
   git clone https://github.com/yourusername/MyStore-MERN.git
   cd MyStore-MERN
   ```

2. **Install dependencies:**

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Setup environment variables** in `/backend/.env`:

   ```
   MONGO_URI=your_mongo_connection_string
   NODE_ENV=development
   ```

4. **Start both servers:**

   * Backend: `npm run start` (from `/backend`)
   * Frontend: `npm run dev` (from `/frontend`)

### 🌍 Deployment

* Frontend is deployed using [Render](https://render.com)
* Backend is also deployed as a web service on Render
* Axios dynamically chooses base URL depending on environment

---

## 💡 Tech Stack

* React + Chakra UI (UI)
* React Router DOM (Routing)
* Axios (HTTP)
* Express.js (API)
* MongoDB + Mongoose (DB)
* CORS + dotenv + path (Middleware + config)

---

## 📸 Screenshots

*Login Page
<img width="1421" height="754" alt="Screenshot 2025-07-23 at 5 19 19 PM" src="https://github.com/user-attachments/assets/fbc85892-04d5-473f-82e5-64ccd53a421d" />

*SignUp page
<img width="1440" height="754" alt="Screenshot 2025-07-23 at 5 20 53 PM" src="https://github.com/user-attachments/assets/a33e00ca-44a0-4ae0-ba49-1bbbea118a06" />

*Home Page
<img width="1438" height="754" alt="Screenshot 2025-07-23 at 5 23 21 PM" src="https://github.com/user-attachments/assets/20617536-cd39-401c-beb8-ecceda5ee2e8" />

---

## 🧐 Author

**Ali Maqsood**
GitHub: [@ali-maqsood1](https://github.com/ali-maqsood1)
Deployed app: [https://mystore-mern.onrender.com](https://mystore-mern.onrender.com)

---

## 📜 License

This project is licensed under the MIT License.

# 🚀 User Management API

A simple RESTful API for managing users with authentication and role-based access control.

## 🌟 Features

✅ **Admin Signup & Login** – Secure authentication using JWT and Validation also added

✅ **Protected Routes** – Access user-related APIs only after login  

✅ **User Management** – Create, Update, Delete, and Fetch users (Admin only)

## 📌 API Endpoints

### **Authentication**

- `POST /api/auth/signup` – Register as an admin
- `POST /api/auth/login` – Login and receive a JWT token

### **User Management (Protected)**

- `POST /api/users` – Create a new user
- `GET /api/users` – Get all users
- `GET /api/users/:id` – Get a specific user
- `PUT /api/users/:id` – Update user details
- `DELETE /api/users/:id` – Delete a user

## 🛠️ Setup & Run

1️⃣ **Clone the Repository**

```bash
git clone https://github.com/niteshsainicoder/UserManagment.git

cd UserManagment
```

1. Move to Directory
   ```
   cd UserManagment
   ```
2. Install Dependencies
   ```
   npm i
   ```
3. Update Env file (According to your prefrence)

4. Run local Server
   ```
   npm run test
   ```

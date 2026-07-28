# Cravings

Cravings is a full-stack food delivery platform built with React, Vite, Express, and MongoDB. It provides role-based dashboards for customers, restaurants, riders, and admins, along with user authentication, restaurant management, menu control, and contact support.

## 🚀 Project Highlights

- **Modern frontend** using React, Vite, Tailwind CSS, and React Router
- **Secure backend** with Express, MongoDB, JWT, and cookie-based authentication
- **Role-based dashboard** support for:
  - Customers
  - Restaurants
  - Riders
  - Admins
- **Restaurant management** features for menu items, cover images, and operational status
- **Password reset flow** with OTP email verification
- **Cloudinary image uploads** for restaurant profile images and menu items
- **Contact form API** for public user inquiries

## 📁 Repository Structure

- `client/` - React frontend
  - `src/components` - reusable UI components
  - `src/pages` - route pages including login, register, dashboard views
  - `src/config/api.config.js` - Axios instance configured for backend API calls
  - `src/context/AuthContext.jsx` - authentication context provider
- `server/` - Express backend
  - `src/config` - database, Cloudinary, and email configuration
  - `src/controllers` - request handlers for auth, public forms, restaurant actions
  - `src/middlewares` - JWT and OTP authentication middleware
  - `src/models` - Mongoose models for users, restaurants, orders, OTPs, menu items
  - `src/routers` - route definitions for auth, public, customer, restaurant, and rider APIs
  - `src/utils` - auth token generation and email helper services

## 🧩 Key Features

### Authentication

- User registration and login
- JWT token generation stored in cookies
- Logout endpoint clears authentication cookie

### Password Recovery

- Send OTP to registered email
- Verify OTP
- Reset password securely using OTP-protected route

### Restaurant Owner Dashboard

- Update restaurant profile and images
- Manage restaurant details and legal information
- Add, edit, enable/disable, and delete menu items
- Get restaurant-specific menu data via API

### Customer Experience

- Browse restaurants and dishes
- Search and filter by category and cuisine
- Access customer dashboard pages

### Public Support

- Submit contact form messages via `/public/contactUs`

## ⚙️ Tech Stack

- Frontend: `React`, `Vite`, `Tailwind CSS`, `React Router Dom`, `React Hot Toast`, `React Icons`
- Backend: `Node.js`, `Express`, `Mongoose`, `MongoDB`, `Cloudinary`, `JWT`, `bcrypt`, `Nodemailer`
- Dev Tools: `ESLint`, `nodemon`

## 💻 Local Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd Cravings
```

### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Create environment variables

Create a `.env` file inside `server/` with the following values:

```env
PORT=4500
MONGO_DB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
GMAIL_USERNAME=<your-gmail-address>
GMAIL_PASSCODE=<your-gmail-app-password>
```

> If you are testing locally, make sure Gmail settings allow sending mail via app password or less secure access.

### 4. Seed the database (optional)

```bash
cd server
npm run seed
```

### 5. Start the backend server

```bash
cd server
npm run dev
```

### 6. Start the frontend app

```bash
cd client
npm run dev
```

### 7. Open the app

Visit the frontend in your browser at:

```bash
http://localhost:5173
```

## 🧪 Available Scripts

### Server

- `npm run dev` - Start the Express backend with `nodemon`
- `npm run seed` - Run database seed script

### Client

- `npm run dev` - Start Vite development server
- `npm run build` - Build production frontend bundle
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview the production build locally

## 📌 API Base URLs

- Frontend API base URL is configured in `client/src/config/api.config.js` as `http://localhost:4500`
- Server accepts frontend requests from `http://localhost:5173` via CORS

## ✨ Notes

- The backend currently exposes secured restaurant routes for managing menu items and details.
- Customer, rider, and admin routers are prepared inside `server/src/routers` and can be extended with additional endpoints.
- Cloudinary is used for image upload and storage, so valid credentials are required.

## 👨‍💻 Author

Aman Verma

---

Enjoy building and customizing the Cravings food delivery experience!

# Verdo – Full-Stack Grocery Delivery Web App
**Verdo** is a real-world **full-stack MERN grocery delivery application** designed for both **customers and sellers**.  
It provides a complete e-commerce workflow — from product management and secure authentication to online payments and order handling.

---
## Live Deployment

- **Frontend (Vercel):** https://verdo-inky.vercel.app
- **Backend API (Vercel Serverless):** https://verdobackend0.vercel.app
---
## Features

### User Features
- User authentication (**Signup / Login / Logout**) using **JWT**
- Browse products by **categories**
- View **best seller products**
- Product details with images & pricing
- Add products to cart
- Add & manage **shipping address**
- Place orders
- Payment options:
  -  Cash on Delivery (COD)
  -  Stripe Online Payment
- View personal order history
  

###  Seller (Admin) Features
- Seller authentication
- Add new products
- Manage product **stock (In-Stock / Out-of-Stock)**
- View all user orders
- Efficient order management

## Tech Stack
---
### Frontend
- **React.js (v19)**
- **Vite**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**
- **React Hot Toast**


### Backend
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT (jsonwebtoken)** – Authentication & authorization
- **bcryptjs** – Password hashing
- **Cookie-Parser** – Secure cookies
- **CORS**
- **dotenv** – Environment variable management

  ### Payments & Media
- **Stripe** – Online payment gateway
- **Stripe Webhooks** – Payment verification & order updates
- **Cloudinary** – Image uploads & storage
- **Multer** – File handling


### Deployment & Tools
- **Vercel** – Frontend & serverless backend deployment
- **Serverless HTTP**
- **MongoDB Atlas**
- **Nodemon** – Development auto-reload



## Authentication & Security
- JWT-based authentication
- Protected routes for users & sellers
- Secure password hashing
- HTTP-only cookies for security



## Payments
- **Cash on Delivery (COD)**
- **Stripe Checkout** for secure payments
- **Stripe Webhooks** used to:
  - Verify payments
  - Update payment status
  - Automatically clear user cart after successful payment
 

## Project Structure
```
verdo/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # Global state (Auth, Cart, etc.)
│   │   ├── assets/         # Images & static assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── server/                 # Backend (Node + Express)
│   ├── controllers/        # Route logic
│   ├── routes/             # API routes
│   ├── models/             # Mongoose schemas
│   ├── middlewares/        # Auth & error handlers
│   ├── configs/            # DB & Cloudinary config
│   ├── server.js           # App entry point
│   └── package.json
├── .env.example            # Environment variables template
├── .gitignore
└── README.md
```
---

## Purpose
This project demonstrates:
- Scalable MERN architecture
- Secure authentication & authorization
- Real-world payment integration
- Clean & responsive UI with Tailwind CSS


## Author

**Sahil Kumar**  
GitHub: [@sksk2522136](https://github.com/sk2522136)  
Email: sk2522136@gmail.com


    



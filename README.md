MERN Stack E-Commerce Platform
A full-featured e-commerce platform built with the MERN (MongoDB, Express.js, React, Node.js) stack. This application provides a complete shopping experience, from browsing products to checkout, along with a full admin dashboard for managing products, users, and orders.

Features
Customer-Facing
Product Catalog: Browse and view all products.

Search Functionality: Full-text search for products.

Product Details: View detailed information, images, and reviews for each product.

Product Reviews: Logged-in users who have purchased an item can leave a rating and a comment.

Shopping Cart: Add/remove items and update quantities.

User Authentication: Secure user registration and login.

Checkout Process: A multi-step checkout flow for shipping, payment, and order confirmation.

User Profile: View and manage personal details and order history.

Admin Dashboard
Product Management: Admins can create, edit, and delete products from the system.

Image Uploads: Option to upload product images directly.

Secure Access: The admin dashboard is a protected area, accessible only to users with admin privileges.

Technology Stack
Backend
Node.js: JavaScript runtime environment.

Express.js: Web framework for Node.js.

MongoDB: NoSQL database for storing product, user, and order data.

Mongoose: Object Data Modeling (ODM) library for MongoDB.

JSON Web Tokens (JWT): For secure user authentication.

Bcrypt.js: For hashing user passwords.

Multer: Middleware for handling file uploads.

Frontend
React: JavaScript library for building user interfaces.

React Router: For client-side routing and navigation.

Redux Toolkit: For efficient and predictable state management.

RTK Query: For data fetching, caching, and server state management.

React-Bootstrap: UI component library.

Vite: Next-generation frontend tooling for a fast development experience.

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js and npm (Node Package Manager)

Git

MongoDB installed and running locally, or a MongoDB Atlas account.

Installation & Setup
Clone the repository:

git clone https://github.com/sprakhil/E-Commerce-app.git
cd E-Commerce-app

Setup the Backend:

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file in the backend root
# Add the following environment variables:
PORT=5001
MONGO_URI=your_mongodb_connection_string # e.g., mongodb://localhost:27017/proshop
JWT_SECRET=your_super_secret_jwt_key

Note: The MONGO_URI should point to your local MongoDB instance or your MongoDB Atlas cluster.

Setup the Frontend:

# Navigate to the frontend folder from the root directory
cd frontend

# Install dependencies
npm install

Running the Application
You will need two terminals running simultaneously: one for the backend and one for the frontend.

Run the Backend Server:

In a terminal, from the backend directory, run:

# This will start the server with nodemon for auto-reloading
npm run server

The backend API will be running on http://localhost:5001.

Run the Frontend App:

In a separate terminal, from the frontend directory, run:

# This will start the Vite development server
npm run dev

The frontend application will be available at http://localhost:5173 (or another port specified by Vite).
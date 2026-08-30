# 🏡 Wanderlust (Airbnb Clone)

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-success)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Deployment](https://img.shields.io/badge/Deployment-Vercel-black)

A modern, full-stack vacation rental application inspired by Airbnb. Built with Node.js, Express, and MongoDB, this project features a stunning custom **Dark Mode UI** with smooth CSS micro-animations, server-side rendering, and a robust serverless architecture designed for deployment on Vercel.

---

## ✨ Key Features

- **Dynamic Property Listings**: Browse, view, and interact with global vacation rental properties.
- **Premium Dark Mode UI**: A meticulously crafted dark theme (`#121212` background, `#1e1e1e` surface) with vibrant `#ff385c` accents.
- **Fluid Animations**: Custom `cubic-bezier` transitions for card hovering, form focuses, and interactive elements.
- **Serverless Ready**: Engineered specifically to run flawlessly on Vercel's Serverless Functions with smart database connection caching.
- **Robust Error Handling**: Custom middleware to intercept MongoDB connection timeouts and Express route failures, displaying user-friendly error pages instead of raw stack traces.
- **MongoDB Atlas Integration**: Fully cloud-hosted database for persistent global data storage.

---

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js (v5)
- **Database**: MongoDB Atlas, Mongoose
- **Frontend/Views**: HTML5, EJS (Embedded JavaScript templates), EJS-Mate
- **Styling**: Vanilla CSS3 (Custom Variables, Flexbox, CSS Grid)
- **Deployment**: Vercel (Serverless), Git/GitHub

---

## 🚀 Live Demo

Check out the live deployment of the application here:
👉 **[View Live Project on Vercel](#)** *(Replace this # with your actual Vercel URL!)*

---

## 💻 Local Development Setup

Want to run this project on your own machine? Follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/aniketpal15/Airbnb.git
cd Airbnb
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your local or cloud MongoDB connection string:
```env
MONGO_URL="mongodb://127.0.0.1:27017/airbnb"
```

### 4. Start the Server
```bash
npm run dev
# OR
node app.js
```
The application will start running on `http://localhost:8080/`.

---

## 🏗️ Project Structure

```text
Airbnb/
├── public/         # Static assets (CSS, Images, Client-side JS)
│   ├── root.css    # Global Dark Mode tokens and animations
│   └── new.css     # Form styling
├── views/          # EJS Templates
│   ├── layouts/    # Global boilerplate templates
│   └── listings/   # Specific pages (index, show, edit, new, error)
├── app.js          # Main application entry point & Serverless handler
├── ExpressError.js # Custom error class
└── package.json    # Dependencies and scripts
```

---

## 👤 Author

**Aniket Pal**
- GitHub: [@aniketpal15](https://github.com/aniketpal15)

---

*If you found this project helpful or inspiring, please consider giving it a ⭐️ on GitHub!*
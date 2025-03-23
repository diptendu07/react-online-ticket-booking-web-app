# 🎟️ E-Cube Web Application

**Live Demo:** [Frontend](https://react-online-ticket-booking.netlify.app/) | [Backend API](https://react-online-ticket-booking-web-app.onrender.com/)

## 📌 Overview
E-Cube Web Application is a modern online ticket booking platform that allows users to browse and book tickets for **movies** and **events**. Built with **React.js** for the frontend and **Node.js with Express** for the backend, this project follows a full-stack development approach and ensures a smooth user experience.

---

## 🚀 Features

### 🎬 **Movies Section**
- Displays the latest movies available for booking.
- Fetches movie data dynamically from the backend.
- Search functionality for quick access.

### 🎭 **Events Section**
- Lists upcoming events users can attend.
- Displays event details fetched from the backend.

### 📅 **Booking System**
- Users can select seats and confirm bookings.
- Real-time updates from the backend API.

### 🔍 **Search Functionality**
- Integrated search bar for quick navigation.
- Filters movies/events based on user input.

### 🎨 **Responsive UI**
- Styled using CSS to provide a modern and intuitive experience.
- Fully responsive across all screen sizes.

---

## 🛠️ Tech Stack

### **Frontend:**
- React.js (Functional Components, Hooks)
- React Router for navigation
- Axios for API calls
- CSS for styling

### **Backend:**
- Node.js with Express
- RESTful API endpoints
- Hosted on Render

### **Database:**
- Currently using static JSON data (Can be integrated with MongoDB in future versions)

### **Deployment:**
- **Frontend:** Hosted on Netlify
- **Backend:** Hosted on Render

---

## 📂 Project Structure
```
e-cube-web-application/
├── client/                 # Frontend React App
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── LatestMoviesList.js
│   │   ├── EventsList.js
│   │   ├── BookingPage.js
│   │   ├── SearchBar.js
│   │   ├── LatestMoviesList.css
│   │   ├── EventsList.css
│   │   ├── BookingPage.css
│   │   ├── SearchBar.css
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   ├── package.json
│   ├── package-lock.json
│   └── /node_modules
│
|── server/                 # Backend Node.js Server
|   ├── server.js
|   ├── server.test.js       # Backend test cases
|   ├── package.json
|   ├── package-lock.json
|   ├── README.md
|   ├── /node_modules
|   └── /public/images      # Stores event and movie images
```

---

📚 Backend Testing

**The backend API has been tested using Jest and Supertest (/server/server.test.js).**

# Run the below command in /server directory to test:
>> npm test

## 🚀 How to Run Locally

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-username/e-cube-web-application.git
cd e-cube-web-application
```

### 2️⃣ **Setup and Run Backend**
```sh
cd server
npm install
npm start
```
> Runs on `http://localhost:5000`

### 3️⃣ **Setup and Run Frontend**
```sh
cd client
npm install
npm start
```
> Runs on `http://localhost:3000`

---

## 🤝 Contributing
Contributions are welcome! Feel free to fork this repository and submit a PR.

---

## 📧 Contact
💡 **Developed by:** *Diptendu Lodh*  
📩 Email: diptendulodh@gmail.com  
🌍 LinkedIn: [My Profile](www.linkedin.com/in/diptendu-lodh-70bab9295)  

---

🚀 **Enjoy the E-Cube Experience!** 🎟️🎬


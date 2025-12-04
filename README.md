# GoStay Booking Platform

A modern, full-featured travel & accommodation booking platform built with **React** and **TypeScript**.

GoStay supports a complete user booking flow, an admin management panel, and a modular, scalable project structure designed for real production environments.

---

## ✨ Overview

GoStay is a project designed to demonstrate:

- Clean architecture  
- Scalable component structure  
- Realistic booking flows  
- Admin CRUD management  
- Proper state handling  
- UI/UX focus  
- Task‑driven development using Linear & Trello  

The project includes:

✔ User homepage  
✔ Search results with filters  
✔ Hotel details (rooms, amenities, reviews, gallery)  
✔ Recently visited tracking  
✔ Cart & checkout  
✔ Booking confirmation  
✔ Admin dashboard with cities/hotels/rooms CRUD  
✔ Full authentication flow  

---

## 🏗️ Tech Stack

### **Frontend**
- React 19 (Hooks & modern patterns)
- TypeScript  
- Vite  
- React Router DOM  
- Axios  
- Formik + Yup  
- Recharts  
- Heroicons  
- CSS Modules  
- Context API (Auth + Cart)

### **Backend**
- JSON files as a mock database  

---

## 📁 Project Structure (Simplified)

```
/gostay-booking-platform
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── features/
│   │   │   ├── admin/
│   │   │   ├── home/
│   │   │   ├── hotel/
│   │   │   ├── search/
│   │   │   └── checkout/
│   │   └── layout/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── types/
│   └── assets/
├── server/
│   ├── data/
│   └── server.js
├── .env
└── README.md
```

---

## 📌 Authentication

```
User:   user / user  
Admin:  admin / admin
```

Role‑based routing is implemented inside the React app using protected routes.

---

## 🛠️ Local Development

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start the backend server

```
cd server
npm install
npm start
```

Server runs at:

```
http://localhost:5000
```

### 3️⃣ Start the frontend

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔧 Environment Variables

Your `.env` file should include:

```
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🧩 Features

### **User Features**
- Trending destinations  
- Featured deals  
- Recently visited hotels  
- Search & filtering  
- Hotel details (gallery, reviews, rooms, amenities)  
- Add to cart  
- Full checkout  
- Booking summary + confirmation  

### **Admin Features**
- Cities CRUD  
- Hotels CRUD  
- Rooms CRUD  
- Stats charts (Recharts)  
- Management dashboard  

---

## 📊 Task Management

### **Linear.app**
- Each major feature/page had its own project
- Each project contained detailed tasks
- GitHub PRs were linked directly to Linear issues
- Commit messages followed a clear pattern  
  Example:  
  `feat(hotel): build gallery section [GOS-74]`

### **Trello Board**
Used to visually present:

- All pages  
- Their features  
- User/admin flows  
- Component structure  
- Branding  
- Development notes  

Trello acts as the **documentation hub** for understanding the app’s experience.

[Trello project overview](https://trello.com/invite/b/692119de075895ed7d4a5e41/ATTIffa88682431c9c9982dcc19d515c3d0fF664C4F6/gostay-website)

---

## 🔧 Development Notes

- Local JSON server was used instead of Swagger API because not all Swagger endpoints matched the required logic.
- Data is stored and read from JSON files inside `/server/data`.
- Hooks are split by feature (home, hotel, search, admin, booking).
- Each major section in the UI is split into isolated reusable components.

---

## 📫 Contact

📍 Palestine  
📧 Email: *manarshawahnii@gmail.com*  
🔗 [LinkedIn](https://www.linkedin.com/in/manarshawahni/en/)

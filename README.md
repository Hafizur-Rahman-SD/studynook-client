# StudyNook – Library Study Room Booking

StudyNook is a full-stack modern web application where students and library patrons can browse, search, filter, and book private study rooms by the hour. The platform features automated time-conflict detection to eliminate double-booking, empowers room owners to manage their listings with full CRUD operations, and provides every registered user with a dashboard to track and cancel upcoming bookings.

**Live Website:** [Pending Deployment / https://studynook-client.vercel.app](https://studynook-client.vercel.app)  
**Backend API:** [https://studynook-server-1240.onrender.com](https://studynook-server-1240.onrender.com)  
**Developer:** [Hafizur Rahman](https://portfolio-website-blue-seven-66.vercel.app/) | [GitHub Profile](https://github.com/Hafizur-Rahman-SD) | `hafizurrahman5004@gmail.com` | `+880 1605-135004`

---

## 🌟 Key Features

* **Hourly Study Room Booking:** Browse available private and collaborative study spaces and book specific hourly slots (08:00 to 21:00) with dynamic price calculation based on duration.
* **Automated Double-Booking Prevention:** Server-side mathematical interval overlap detection prevents conflicting reservations for the same room and date using MongoDB `$gte` and `$lte` operators.
* **Owner Listing Management (Full CRUD):** Authenticated users can list new rooms with image URLs, floor level, capacity, hourly rate, and amenity tags. Owners have exclusive permissions to edit or delete their rooms.
* **User Booking Management & Cancellation:** A dedicated "My Bookings" dashboard displaying real-time booking status (confirmed/cancelled) with modal confirmation for cancelling upcoming reservations (utilizing `$pull` to manage booking references).
* **Secure JWT Authentication in HTTP-Only Cookies:** Hybrid auth system supporting both traditional email/password and Google OAuth, storing JSON Web Tokens strictly in secure HTTP-only cookies to eliminate XSS vulnerability and preserve session across page reloads.
* **Search & Multi-Facet Filtering:** Real-time search by room name, amenity selection chips (Whiteboard, Wi-Fi, Projector, Quiet Zone, AC, Power Outlets), and price range filtering.
* **Responsive Reading Room Design System:** Bespoke academic library UI theme with Fraunces serif typography, Framer Motion micro-interactions, dark/light theme toggle, and responsive mobile-first navigation.
* **24/7 Keep-Alive Health Architecture:** Built-in health/ping endpoints (`/ping`, `/api/health`) and automated background polling to keep cloud hosting services active 24/7 without cold-start idle timeouts.

---

## 🛠️ Technology Stack

### Frontend (Client)
* **Framework:** React 19 + Vite
* **Routing:** React Router v7
* **Styling:** Tailwind CSS v4 + Custom Reading Room Design System
* **Animations:** Framer Motion
* **Authentication:** `@react-oauth/google` + Context API
* **Notifications:** `react-hot-toast`
* **HTTP Client:** Axios (configured with `withCredentials: true`)

### Backend (Server)
* **Runtime:** Node.js (v20+ LTS)
* **Framework:** Express.js
* **Database:** MongoDB Atlas + Mongoose
* **Security:** `jsonwebtoken` (HTTP-only cookies), `bcryptjs` (password hashing), `cookie-parser`, `cors`
* **Google Auth:** `google-auth-library`

---

## 🚀 Getting Started Locally

### Prerequisites
* Node.js 20+ installed
* MongoDB Atlas account & URI string
* Google Cloud Console OAuth Client ID

### 1. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Fill in your MONGODB_URI, JWT_SECRET, and GOOGLE_CLIENT_ID
npm run seed     # Populate database with 6 initial study rooms
npm run dev      # Start server on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd client
npm install
cp .env.example .env
# Fill in your VITE_GOOGLE_CLIENT_ID
npm run dev      # Start client on http://localhost:5173
```

---

## 🔒 Environment Variables

### `server/.env`
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.ba8duyg.mongodb.net/studynook?retryWrites=true&w=majority
JWT_SECRET=your_32_byte_secret_key
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### `client/.env`
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
VITE_API_URL=/api
```

---

## 📂 Project Architecture
```
PH-B13-A9/
├── client/                     # Frontend Vite + React SPA
│   ├── src/
│   │   ├── components/         # Layout, UI components, Room cards, Modals
│   │   ├── context/            # AuthContext and ThemeContext
│   │   ├── pages/              # Home, Rooms, RoomDetails, MyBookings, etc.
│   │   ├── lib/                # Axios instance, constants
│   │   └── routes/             # PrivateRoute guards
│   └── vercel.json             # SPA rewrites & reverse proxy to backend
└── server/                     # Backend Node/Express API
    ├── src/
    │   ├── config/             # MongoDB database connection
    │   ├── controllers/        # Auth, Room, and Booking controllers
    │   ├── middleware/         # Cookie JWT verification middleware
    │   ├── models/             # User, Room, and Booking Mongoose schemas
    │   └── routes/             # Express API routes
    ├── server.js               # Entry point with 24/7 keep-alive pinger
    └── seed.js                 # Sample study rooms seeder
```

---

## 👨‍💻 Author
**Hafizur Rahman**  
* GitHub: [@Hafizur-Rahman-SD](https://github.com/Hafizur-Rahman-SD)  
* Email: [hrrony859@gmail.com](mailto:hrrony859@gmail.com)

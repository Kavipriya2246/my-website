# 🔄 Skill Swap — Peer-to-Peer Skill Exchange Platform

> "A system that connects users based on skills they offer and skills they need."

Academic Project | Web Development | 2025

---

## 🏗️ Project Structure

```
skill-swap/
├── frontend/        → React App (UI)
├── backend/         → Node.js + Express API
└── README.md
```

---

## ⚙️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React.js, React Router, Axios     |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB + Mongoose                |
| Auth      | JWT (JSON Web Tokens) + bcryptjs  |
| Styling   | Custom CSS (no external UI lib)   |

---

## 🚀 Setup & Run (Step by Step)

### Prerequisites
- Node.js v18+ installed → https://nodejs.org
- MongoDB installed locally OR a free MongoDB Atlas cloud account

---

### 1. Clone / Download the project

```bash
cd skill-swap
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Open `.env` and set your MongoDB URI:

```
MONGO_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=any_long_random_string_here
PORT=5000
```

Start the backend:

```bash
npm run dev      # with auto-restart (nodemon)
# OR
npm start        # without auto-restart
```

✅ You should see:
```
🚀 Server running on http://localhost:5000
✅ MongoDB Connected: localhost
```

---

### 3. Setup the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

✅ React app opens at **http://localhost:3000**

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| POST   | /api/auth/register    | Register new user   |
| POST   | /api/auth/login       | Login & get token   |

### Users
| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/users/me         | Get my profile           |
| PUT    | /api/users/me         | Update profile & skills  |
| GET    | /api/users            | Get all users            |

### Matches
| Method | Endpoint                  | Description             |
|--------|---------------------------|-------------------------|
| GET    | /api/matches              | Get my matches          |
| POST   | /api/matches/request      | Send match request      |
| PUT    | /api/matches/:id/accept   | Accept a request        |
| PUT    | /api/matches/:id/reject   | Reject a request        |

---

## 🧠 Matching Algorithm

```
User A skillOffered  ∩  User B skillWanted  →  overlap_1
User B skillOffered  ∩  User A skillWanted  →  overlap_2

score = ((overlap_1 + overlap_2) / max_possible) × 100
```

A score of 100% means a perfect bilateral skill match.

---

## 🗄️ Database Collections

**users**
```json
{
  "name": "Arjun",
  "email": "arjun@email.com",
  "password": "<hashed>",
  "skillOffered": ["Python", "React"],
  "skillWanted": ["Figma", "UI Design"],
  "level": "Intermediate"
}
```

**matches**
```json
{
  "user1": "<ObjectId>",
  "user2": "<ObjectId>",
  "status": "pending | accepted | rejected"
}
```

**messages** (optional)
```json
{
  "sender": "<ObjectId>",
  "receiver": "<ObjectId>",
  "message": "Hey, want to swap skills?",
  "timestamp": "2025-01-01T10:00:00Z"
}
```

---

## 🌐 Page Flow

```
Home  →  Register / Login  →  Dashboard  →  Profile  →  Matches  →  Connect
```

---

## 🎤 Viva Explanation (say this confidently)

> "Skill Swap follows a three-tier architecture: a React frontend for the UI,
> a Node.js + Express backend for business logic, and MongoDB for data storage.
> The core feature is an intelligent matching algorithm that computes a compatibility
> score between users based on the skills they offer and the skills they need.
> Authentication is handled using JWT tokens, and the API follows RESTful conventions."

---

## 👤 Author

Academic Project — 2025

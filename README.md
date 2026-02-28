# 💰 Expense Tracker & Financial Analytics Dashboard

A full-stack personal finance management app built with the **MERN stack**. Track your income and expenses, visualize spending habits with interactive charts, and stay on top of your financial health — all in one sleek, dark-themed dashboard.

---

## 🧰 Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

---

## 🚀 Live Demo

> _Coming soon / Add your deployment link here_

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register/login with bcrypt password hashing and token-based auth
- 📊 **Interactive Dashboard** — Real-time financial overview with income, expenses, and balance summary
- 🍩 **Expense Pie Chart** — Visual breakdown of spending by category
- 🍩 **Income Pie Chart** — Visual breakdown of income by category
- 📈 **Monthly Bar Chart** — Trend view of expenses across months
- ➕ **Add Transactions** — Log income or expenses with category, date, and optional note
- 🔒 **Protected Routes** — Dashboard accessible only to authenticated users
- 📱 **Responsive UI** — Optimized for both desktop and mobile with Tailwind CSS

---

## 📁 Project Structure

```
Expense-Tracker-And-Financial-Analytics-Dashboard/
│
├── backend/
│   ├── models/
│   │   ├── User.js              # User schema (name, email, password)
│   │   └── Transaction.js       # Transaction schema (amount, type, category, date, note)
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification middleware
│   ├── routes/
│   │   ├── authRoutes.js        # POST /register, POST /login
│   │   └── transactionRoutes.js # CRUD + aggregation endpoints
│   └── server.js                # Express app entry point
│
└── frontend/
    └── src/
        ├── services/
        │   └── api.jsx           # Axios instance with auth interceptor
        ├── components/
        │   ├── SummaryCard.jsx       # Income / Expense / Balance cards
        │   ├── AddTransactions.jsx   # Transaction form
        │   ├── ExpensePieChart.jsx   # Recharts pie chart (expenses)
        │   ├── IncomePieChart.jsx    # Recharts pie chart (income)
        │   ├── MonthlyBarChart.jsx   # Recharts bar chart (monthly)
        │   └── ProtectedRoute.jsx    # Auth-guarded route wrapper
        └── pages/
            ├── Dashboard.jsx     # Main app view
            ├── Login.jsx         # Login page
            └── Register.jsx      # Register page
```

---

## 🔌 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive JWT token |

### Transaction Routes — `/api/transactions` *(Protected)*

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Add a new transaction |
| GET | `/` | Get all transactions for logged-in user |
| GET | `/summary` | Get total income, expense, and balance |
| GET | `/expense-summary` | Expense totals grouped by category |
| GET | `/income-summary` | Income totals grouped by category |
| GET | `/category-summary` | All transactions grouped by category |
| GET | `/monthly-expense` | Monthly expense totals (for bar chart) |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone the repository
```bash
git clone https://github.com/thesujith23/Expense-Tracker-And-Financial-Analytics-Dashboard.git
cd Expense-Tracker-And-Financial-Analytics-Dashboard
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the server:
```bash
npm start
```

### 3. Setup the Frontend
```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA).

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port for the Express server (default: 5000) |
| `MONGO_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |

---

## 🧠 How It Works

1. **User registers/logs in** → Backend hashes the password with bcrypt and issues a JWT
2. **JWT is stored in localStorage** → Axios interceptor automatically attaches it to every request via `Authorization: Bearer <token>`
3. **authMiddleware** on the backend verifies the token on every protected route
4. **Transactions** are stored in MongoDB with `userId` reference, ensuring data isolation per user
5. **MongoDB Aggregation Pipelines** power the summary, category breakdown, and monthly trend endpoints
6. **Recharts** renders the data into interactive pie and bar charts on the dashboard

---

## 🐛 Known Issues / Future Improvements

- [ ] Add delete/edit transaction functionality
- [ ] Add date range filtering for charts
- [ ] Paginate the transaction list
- [ ] Add loading skeletons while data fetches
- [ ] Deploy backend to Render / Railway and frontend to Vercel / Netlify
- [ ] Add error boundaries for chart components

---

## 👨‍💻 Author

**Sujith**  
[GitHub](https://github.com/thesujith23)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

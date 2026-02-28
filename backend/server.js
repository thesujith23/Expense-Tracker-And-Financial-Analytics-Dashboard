const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const transactionRoutes = require("./routes/transactionRoutes")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)

// const authMiddleware = require("./middleware/authMiddleware")

// app.get("/protected", authMiddleware, (req, res) => {
//   res.json({ message: "Access granted", user: req.user })
// })

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected Successfully'))
    .catch((err) => console.error(err))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})
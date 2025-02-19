const express = require('express');
const connectDB = require('./config/db')
const userRoutes = require('./routers/userRouters')
const dotenv = require('dotenv')
dotenv.config()
connectDB()
const app = express();
app.use(express.json());

app.use('/api', userRoutes)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
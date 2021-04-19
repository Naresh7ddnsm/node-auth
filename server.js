require('dotenv').config({path: "./config.env"})
const express = require('express');
const auth = require("./routes/auth")
const connectDB = require("./config/db")

// Connect DB
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", auth);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`The server running on port ${PORT}`);
})

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})
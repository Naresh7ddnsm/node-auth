require('dotenv').config({path: "./config.env"})
const express = require('express');
const connectDB = require("./config/db")

const auth = require("./routes/auth")
const private = require("./routes/private")



const errorHandler = require("./middleware/error")

// Connect DB
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/private", private);

// Use the errorhandle middleware as last part of the middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`The server running on port ${PORT}`);
})

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})
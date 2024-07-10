

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/connectDB');

const authRoutes = require('./routes/Auth.route')
const userRoutes = require('./routes/User.route');

const app = express();

app.use(cookieParser());
dotenv.config(); // Load environment variables from.env file
app.use(express.json());

const port = process.env.PORT || 8081

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
})

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
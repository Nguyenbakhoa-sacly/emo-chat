

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config(); // Load environment variables from.env file
app.use(express.json());

const port = process.env.PORT || 8081

app.use(cors({
  origin: '*', // Allow all origins
  credentials: true, // Send cookies when making requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'] // Enable specific HTTP methods
})); // Enable CORS for all routes




app.get("/", (req, res) => {
  res.send("Hello, World!");
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOBD_URL);

    const connection = mongoose.connection
    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });

    connection.on("error", (err) => {
      console.log("MongoDB error: ", err);
    });
  } catch (e) {
    console.log("Something is wrong ", e);
  }
}

module.exports = connectDB;
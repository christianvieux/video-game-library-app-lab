const dotenv = require("dotenv"); dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
// Routes
const allRoutes = require("./routes.js"); 


//-------------------------------[[ Functions ]]-----------------------------
async function connectToDB(MONGODB_URI, PASSWORD) {
  await mongoose.connect(
    MONGODB_URI.replace("<db_password>", PASSWORD)
  );
  console.log("Connected to MongoDB.");

  return {
    closeConnection: async function () {
      await mongoose.connection.close();

      console.log("Connection to MongoDB Closed.");
    },
  };
}


// ------------------------------[[ Main execution ]]-------------------------------
async function startApp() {
  // Establish DB connection first
  const DB_Connection = await connectToDB(
    process.env.MONGODB_URI,
    process.env.PASSWORD
  );

  // Public assets
  app.use(express.static("public"));
  // Use middleware for parsing form data
  app.use(express.urlencoded({ extended: false }));
  // Needed for the 'app.delete()' route to work 
  app.use(methodOverride("_method"));
  app.use(morgan("dev"));
  // Use imported routes
  app.use("/", allRoutes); 

  // App listener
  const PORT = 3000; app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  // Closing the DB connection when the server shuts down
  process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    await DB_Connection.closeConnection();
    process.exit();
  });
}

startApp();
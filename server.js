require("dotenv").config();
const ConnectToDb = require("./src/config/db");

const app = require("./src/app");

const startServer = async () => {
  const isDbConnected = await ConnectToDb();
  app.listen(3001, () => {
    console.log("Server running on port 3001");
    if (!isDbConnected) {
      console.log("Running without database connection. Database-dependent routes will fail until MongoDB is reachable.");
    }
  });
};

startServer();

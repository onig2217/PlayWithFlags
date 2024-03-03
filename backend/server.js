const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const db = require("./models/index");

// Connected to our front
const corsOption = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOption));

// Init the server and the database
const initApp = async () => {
  console.log("Trying to connect to the server and the database.");
  try {
    await db.sequelize.authenticate();
    console.log("Database has been connected.");
    await db.sequelize.sync();
    console.log("Database synchronization.");
    console.log("--------------------------------");
    app.listen(port, () => {
      console.log("Server has been connected.");
      console.log("Server is available here at : http://localhost:8080");
    });
  } catch (err) {
    console.log(err);
  }
};

initApp();

const userRoutes = require("./components/user/UserRoutes");

app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Express ! (:");
});

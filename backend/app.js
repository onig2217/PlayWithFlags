// const express = require("express");
// const app = express();
// const cors = require("cors");
// var path = require("path");
// // var cookieParser = require("cookie-parser");

// // cors options
// const corsOptions = {
//   origin: "http://localhost:3000",
// };
// app.use(cors(corsOptions));

// // On appel les fichiers routes
// const userRoutes = require("./components/user/UserRoutes");

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// // router.get("/", (req, res) => {
// //   res.render("index");
// // });

// // router.get("/about", (req, res) => {
// //   res.render("about", { title: "Hey", message: "Hello there!" });
// // });

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// // On defini les routes ici
// app.use("/api", userRoutes);

// db.sequelize
//   .authenticate()
//   .then(() => {
//     console.log("good");
//   })
//   .catch(() => {
//     console.log("not good");
//   });

// // app.get("/api", (req, res) => {
// //   res.send("Hello World!");
// // });

// module.exports = app;

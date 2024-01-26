const { User } = require("../../models");
const jwt = require("jsonwebtoken");

exports.getAllUsers = (req, res, next) => {
  User.findAll({}).then((users) => {
    res.send(users);
  });
};

// exports.login = (req, res) => {
//   if (!req.body.email || !req.body.password) {
//     res.status(400).send("Email ou password manquant !");
//   } else {
//     let currentUser;
//     for (let user in db.users) {
//       if (
//         req.body.email === db.users[user].email &&
//         req.body.password === db.users[user].password
//       ) {
//         currentUser = db.users[user];
//         break;
//       }
//     }
//     if (!currentUser) {
//       res.status(400).send("Email ou password incorrect");
//     } else {
//       res.status(200).send({
//         user: currentUser,
//         response: "User registred !",
//       });
//     }
//   }
// };

// exports.verifyToken = (req, res) => {
//   try {
//     let token = req.body.token;
//     let checkToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
//     res.status(200).send(checkToken);
//   } catch (err) {
//     res.status(401).json({
//       error: err,
//     });
//   }
// };

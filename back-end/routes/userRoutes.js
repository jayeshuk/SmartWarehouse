const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.route("/sendorder/:id").patch(userController.addOrder);
router.route("/loadorder/:id").post(userController.loadOrder);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

const express = require("express");
const produceController = require("../controllers/produceController");

const router = express.Router();

router.route("/call").post(produceController.callStoredProduces);

router
  .route("/")
  .get(produceController.getAllProduces)
  .post(produceController.createProduce);

router
  .route("/:id")
  .get(produceController.getProduce)
  .patch(produceController.updateProduce)
  .delete(produceController.deleteProduce);

module.exports = router;

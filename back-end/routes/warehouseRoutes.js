const express = require("express");
const warehouseController = require("../controllers/warehouseController");

const router = express.Router();

router.route("/").get(warehouseController.getAllWarehouses);
router.route("/").post(warehouseController.createWarehouse);

router
  .route("/:id")
  .get(warehouseController.getWarehouse)
  .patch(warehouseController.updateWarehouse)
  .delete(warehouseController.deleteWarehouse);

module.exports = router;

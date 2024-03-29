const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController");
const dataController = require("../controllers/dataController");
const etherController = require("../controllers/etherController");

router.use("/user", userController);
router.use("/data", dataController);
router.use("/ether", etherController);


module.exports = router;
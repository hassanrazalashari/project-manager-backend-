//project routes
const express = require("express");
const projectcontroller = require("../controllers/projectcontroller");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/createproject",verifyToken ,projectcontroller.createproject);
router.get("/getprojects",verifyToken ,projectcontroller.getprojects);

module.exports = router;
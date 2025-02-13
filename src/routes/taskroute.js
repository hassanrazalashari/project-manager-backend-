//task route
const express = require("express");
const taskcontroller = require("../controllers/taskcontroller");

const router = express.Router();

router.post("/addtask", taskcontroller.addtask);
router.put("/updatetask/:id", taskcontroller.updatetask);
router.get("/gettasks/:projectid", taskcontroller.gettasks);

module.exports = router;
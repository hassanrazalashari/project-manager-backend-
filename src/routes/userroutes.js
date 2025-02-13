//user routes
const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");
const verifyToken = require("../middleware/authMiddleware");

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.post("/sendotp", usercontroller.sendOTP);
router.post("/verifyotp", usercontroller.verifyOTP);
router.post("/resetpassword", usercontroller.resetpassword);
router.get("/getuser", verifyToken ,usercontroller.getuser);
router.put("/updateuser", verifyToken ,usercontroller.updateuser);

module.exports = router;
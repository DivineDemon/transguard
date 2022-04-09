const express = require("express");
const { addEmployee, loginEmployee } = require("../controllers/authController");
const router = express.Router();

router.post("/register", addEmployee);
router.post("/login", loginEmployee);

module.exports = router;

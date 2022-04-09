const asyncHandler = require("express-async-handler");
const Employee = require("../models/Employee");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const addEmployee = asyncHandler(async (req, res) => {
  if (!req.body.username && !req.body.email && !req.body.password) {
    res.status(400);
    throw new Error("Please add all text fields.");
  }

  try {
    const employee = await Employee.create({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const loginEmployee = asyncHandler(async (req, res) => {
  if (!req.body.username && !req.body.password) {
    res.status(400);
    throw new Error("Please add all text fields.");
  }

  try {
    const employee = await Employee.findOne({
      username: req.body.username,
    });

    if (!employee) {
      res.status(404).json({ message: "Employee Not Found!" });
    }

    const password = CryptoJS.AES.decrypt(
      employee.password,
      process.env.SECRET
    ).toString();

    if (!password) {
      res.status(401).json({ message: "Wrong Credentials!" });
    }

    const accessToken = jwt.sign(
      {
        id: employee.id,
        isAdmin: employee.isAdmin,
      },
      process.env.SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({ ...employee, accessToken });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  addEmployee,
  loginEmployee,
};

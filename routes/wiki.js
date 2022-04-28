const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage.js");

router.get("/", (req, res) => {
  try {
    res.send("Hi");
  } catch (err) {
    console.log("you have an error :(");
  }
});

router.post("/", (req, res) => {
  try {
    res.json(req.body);
  } catch (err) {
    console.log("still an error");
  }
});

router.get("/add", (req, res) => {
  try {
    res.send(addPage());
  } catch (err) {
    console.log("er error");
  }
});

module.exports = router;

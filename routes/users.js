const express = require("express");
const { User } = require("../models");
const { Page } = require("../models");
const userList = require("../views/userList");
const userPages = require("../views/userPages");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const pages = await Page.findAll({
      where: {
        authorId: user.id,
      },
    });
    res.send(userPages(user, pages));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

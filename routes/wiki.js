const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage.js");
const { Page } = require("../models");

router.get("/", (req, res) => {
  try {
    res.send("Hi");
  } catch (err) {
    console.log("you have an error :(");
  }
});

function generateSlug(title) {
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
}

router.post("/", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  try {
    const page = await Page.create({
      title: title,
      content: content,
    });

    page.beforeValidate(() => {
      page.slug = generateSlug(title)
    });

    res.redirect("/");
  } catch (err) {
    console.log(err);
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

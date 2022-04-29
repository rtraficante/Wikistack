const express = require("express");
const router = express.Router();
const { Page, User } = require("../models");
const { addPage, wikiPage, main, editPage } = require("../views");

router.get("/", async (req, res) => {
  try {
    const pages = await Page.findAll();
    console.log(pages);
    res.send(main(pages));
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const authorName = req.body.authorName;
  const authorEmail = req.body.authorEmail;
  const status = req.body.status;

  try {
    const page = await Page.create({
      title: title,
      content: content,
      status: status,
    });

    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: authorName,
        email: authorEmail,
      },
    });

    await page.setAuthor(user);

    res.redirect(`/wiki/${page.slug}`);
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

router.get("/:slug", async (req, res) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    const author = await page.getAuthor();

    res.send(wikiPage(page, author));
  } catch (err) {
    console.log(err);
    res.status(404).send("not found");
  }
});

router.get("/:slug/edit", async (req, res) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    const author = await page.getAuthor();
    res.send(editPage(page, author));
  } catch (err) {
    console.log(err);
  }
});

router.put("/:slug", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const name = req.body.authorName;
  const email = req.body.authorEmail;
  const status = req.body.status;

  try {
    await Page.update(
      { title, content, status },
      {
        where: {
          slug: req.params.slug,
        },
      }
    );

    const page = await Page.findOne({ where: { slug: req.params.slug } });

    await User.update(
      { name, email },
      {
        where: {
          id: page.authorId,
        },
      }
    );

    res.redirect(`/wiki/${req.params.slug}`);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:slug", async (req, res) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug,
      },
    });

    res.redirect(`/`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

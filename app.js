const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const main = require("./views/main");
const { db, Page, User } = require("./models");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/stylesheets"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/main", (req, res) => {
  res.send(main(""));
});

const PORT = 1337;

// Initiallized Database and Server
const init = async () => {
  // Syncing database models
  await db.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
  });
};

init();

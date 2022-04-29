const express = require("express");
const morgan = require("morgan");
const { db } = require("./models");
const users = require("./routes/users");
const wiki = require("./routes/wiki");
const methodOverride = require("method-override");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use("/users", users);
app.use("/wiki", wiki);

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

const PORT = 1337;

// Initiallized Database and Server
const init = async () => {
  // Syncing database models
  await db.sync({ force: false });

  app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
  });
};

init();

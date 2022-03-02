const path = require("path");
const express = require("express");
const hbs = require("hbs");
const weather = require("./services");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
//FILE PATH
const PUBLIC = path.join(__dirname, "../public");
const VIEWS = path.join(__dirname, "../templates/views");
const PARTIALS = path.join(__dirname, "../templates/partials");

//ALL SETUP ENGINE AND VIEWS LOCATION
app.set("view engine", "hbs");
app.set("views", VIEWS);
app.use(express.static(PUBLIC));
hbs.registerPartials(PARTIALS);

app.get("", (req, res) => {
  res.render("index", {
    html: "Home",
    title: "Weather.js",
    content:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    html: "About",
    title: "Weather.js",
    content:
      "This site was created by Haekal Alexander Dinova as his first express.js app, this is not a real app but it's a proof that he really commit a change on his life",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    html: "Help",
    message: "Help page is under maintanance",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    content: "Documentation not found Go back to help?",
    redirect: "/help",
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", {
    html: "Check Weather",
    message: "The output weather is based on observation time",
  });
});

app.get("/weather/get", async (req, res, next) => {
  console.log("Processing data.....");
  const { town, lat, long } = req.query;
  const response = await weather(req.query);
  res.send(response);
});

//404 MUST BE LAST
app.get("*", (req, res) => {
  res.render("404", {
    content: "Page not found, Go back to Index?",
    redirect: "/",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

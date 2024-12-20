const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials/");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));


//check the correct domain
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.render("index", {title: "Movies App"});
});


app.get("*", (req, res) => {
    res.render("404", {title: "Page not found"});
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});


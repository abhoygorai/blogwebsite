//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-abhoy:adminpass@cluster0.e5ghf.mongodb.net/blogWebsite");

const blogModel = new mongoose.model("blog", {
  blogId: Number,
  titleContent: String,
  textContent: String
});
const additionalModel = new mongoose.model("extra", {
  blogId: Number,
  titleContent: String,
  textContent: String
});


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let homeText = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
  
  blogModel.find({}, function (err, searchResult) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("home", {
        para: homeText,
        posts: searchResult
      });
    }
  });
});


app.get("/about", function (req, res) {
  additionalModel.findOne({ titleContent: "about-text-content" }, function (err, result) {
    if(err){
      console.log(err);
    }
    else{
      res.render("about", { para: result.textContent });
    }
  });
});

app.get("/contact", function (req, res) {
  additionalModel.findOne({ titleContent: "contact-text-content" }, function (err, result) {
    if(err){
      console.log(err);
    }
    else{
      res.render("contact", { para: result.textContent });
    }
  });
});

app.get("/post/blog-:parameter", function(req, res){
  blogModel.find({blogId: req.params.parameter}, function (err, searchResult) {
    res.render("post",{
      title: searchResult[0].titleContent,
      bodyContent: searchResult[0].textContent
    })
  });
});

let port = process.env.PORT;

if(port == null){
  port = 4000;
}

app.listen(port, function () {
  console.log("Server started");
});
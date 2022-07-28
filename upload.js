const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-abhoy:adminpass@cluster0.e5ghf.mongodb.net/blogWebsite");
const dataSchema = mongoose.Schema({
    titleContent: String,
    textContent: String
});
const blogModel = new mongoose.model("blog", dataSchema);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("compose");
});

app.post("/", function(req, res){
    const newPost = new blogModel({
        titleContent: req.body.postTitle,
        textContent: req.body.postBody
    });
    newPost.save();
    console.log("posted succesfully");
    res.render("message", {messageText: "Posted succesfully"});
});

app.post("/message", function(req,res){
    res.redirect("/");
});


app.listen(3000, function(err, res){
    console.log("server started at port 3000");
});
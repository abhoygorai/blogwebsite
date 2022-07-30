const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-abhoy:adminpass@cluster0.e5ghf.mongodb.net/blogWebsite");
const dataSchema = mongoose.Schema({
    blogId: Number,
    titleContent: String,
    textContent: String
});

const blogModel = new mongoose.model("blog", dataSchema);
const idModel = new mongoose.model("blogid", {
    name: String,
    idNo: Number
});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("compose");
});

app.post("/", function(req, res){
    idModel.find({name: "main"}, function (err, obj) {
        const next = obj[0].idNo + 1;
        console.log(next);
        const newPost = new blogModel({
            blogId: next,
            titleContent: req.body.postTitle,
            textContent: req.body.postBody
        });
        newPost.save();
        idModel.findOneAndUpdate({name:"main"}, {$set:{idNo:next}}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
                res.render("message", {messageText: "Error occured"});
            }
            else{
                res.render("message", {messageText: "Posted succesfully"});
            }
        });
    });
});

app.post("/message", function(req,res){
    res.redirect("/");
});


app.listen(3000, function(err, res){
    console.log("server started at port 3000");
});
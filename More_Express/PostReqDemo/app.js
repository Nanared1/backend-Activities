var express = require("express");
var app = express();
var bP = require("body-parser")

app.use(bP.urlencoded({extended: true}));

var friends = ["Sen", "Prabh", "Aman", "Brett"];

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.post("/addFriend", function(req, res){
    var newFriend = (req.body.newFriend);
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is listening"); 
});
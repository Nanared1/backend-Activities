var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
    
});
app.get("/fall/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("some", {thingVar: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "Post1", Author: "Susie"},
        {title: "Adorabele Pet Bunny", Author: "Nana"},
        {title: "Hello world", Author: "Charlie"}
    ];
    
    res.render("post", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is listening"); 
});
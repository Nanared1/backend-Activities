var express = require("express");
var app = express();
app.get("/", function(req, res){
    res.send("Hi there");
});
app.get("/bye", function(req,res){
    res.send("Good Bye");
})
app.get("/dog", function(req, res) {
    res.send("Wolf Wolf");
    console.log("Someone Made a request")
})
app.get("/r/:name", function(req, res) {
    var sub = req.params.name;
    res.send("Welcome to the " + sub +" comments");
    console.log(sub);
})
app.get("*", function(req, res) {
    res.send("Error 404");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});

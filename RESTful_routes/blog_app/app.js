var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true }); 
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
//     title: "Dog",
//     image: "https://pixabay.com/get/ea37b6082cf5073ed1584d05fb1d4e97e07ee3d21cac104491f0c47ea7efb5b9_340.jpg",
//     body: "This is a blog post"
// });


// index route
app.get("/", function(req, res) {
   res.redirect("/blogs"); // redirect page to index page
});

// create route
// create data for database here
app.get("/blogs", function(req, res){
    // Sanitize the blog content
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.find({}, function(error, data){
        if(error){
            console.log("Error\n"+error);
        }else{
            res.render("index", {blogs: data});
        }
    });
    //res.render("index"); 
});

// new blog
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// new blog
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(error, newBlog){
        if(error){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(error, fBlog){
       if(error){
           res.redirect("/blogs");
       }else{
           res.render("show", {blog: fBlog});
       }
   });
});

// Edit blog post
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(error, fBlog){
        if(error){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog:fBlog});    
        }
    });
});

// Update blog post
app.put("/blogs/:id", function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, uBlog){
        if(error){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(error){
        if(error){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is running"); 
});
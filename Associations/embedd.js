var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/embed_Data", { useNewUrlParser: true });

// Post, title - content
var postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

var Post = mongoose.model("Post", postSchema);

// User, name email
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

var newUser = new User({
    email: "sup@canada.com",
    name: "Sup You",
});

// newUser.posts.push({
//     title: "I hate this place",
//     content: "Get me out of here"
// });

// newUser.save(function(error, user){
//     if(error){
//         console.log(error);
//     }else{
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Cool Cars",
//     content: "Apples and oranges"
// });

// newPost.save(function(error, post){
//     if(error){
//         console.log(error);
//     }else{
//         console.log(post);
//     }
// });


User.findOne({name: "Sup You"},function(error, user){
    if(error){
        console.log(error);
    }else{
        user.posts.push({
            title: "I just got out",
            content: "I will get an internship this sup ehhhhhh!!"
        });
        
        user.save(function(error, user){
            if(error){
                console.log(error);
            }else{
                console.log(user);
            }
        });
    }
});
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
    posts: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Post"
        }
    ]
});

var User = mongoose.model("User", userSchema);

Post.create({
    title: "Learn to program",
    content: "Blah blah..............."
}, function(error, post){
    User.findOne({
        email:"bob@bob.com"
    }, function(error, user){
        if(!error){
            user.posts.push(post);
            user.save(function(error, data){
                if(!error){
                    console.log(data);
                }else{
                    console.log(error);
                }
            });
        }else{
            console.log(error);
        }
    });
});

// User.create({
//     name: "Bob",
//     email: "bob@bob.com"
// });
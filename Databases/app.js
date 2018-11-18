var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true }); 


var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var cat = mongoose.model("Cat", catSchema);

// var george = new cat({
//     name: "Mrs Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(error, cat){
//     if(error){
//         console.log("Something went wrong");
//     }else{
//         console.log("Cat saved: \n " + cat);
//     }
// });

cat.create({
    name: "Snow white",
    age: 15,
    temperament: "sorta nice"
}, function(error, cat){
    if(error){
        console.log("error \n" + error);
    }else{
        console.log("Cats: \n" + cat)
    }
});

cat.find({}, function(error, cats){
    if(error){
        console.log("Error \n" + error);
    }else{
        console.log("All Cats\n"+cats);
    }
})

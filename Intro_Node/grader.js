function average(marks){
    var add = 0;
    for(var i=0; i<marks.length; i++){
        add += marks[i];
    }
    var avg = add/marks.length;
    return(Math.ceil(avg));
}
var m_class = [90, 98, 89, 100, 100, 86, 94];
console.log(average(m_class));
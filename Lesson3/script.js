// console.log("Hello World");

// var os = require('os')
// console.log(os.arch());

var express = require("express");
var app = express();
app.use(express.static('./'));
app.get('/',(req,res)=>{
    res.send("Hello Dude!");
})

app.get('/google'  , (req,res)=>{

    res.redirect("https://www.google.com")

})
app.get("/google/:search",(req,res)=>{
    const search = req.params.search
    res.redirect(`https://www.google.com/search?q=${search}`)
})
app.get("/*",(req,res)=>{
    res.redirect("404.html")
})
app.listen(3000);
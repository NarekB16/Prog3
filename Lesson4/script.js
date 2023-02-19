var p = document.querySelectorAll("p");
console.log(p);
var myClass = document.querySelectorAll(".myClass");
console.log(myClass);
var myId = document.querySelector("#myId");
console.log(myId);
var button = document.querySelector('button');
button.addEventListener('click',()=>{
    myId.innerHTML = "Tiiiiiik";

});


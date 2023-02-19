var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var massage = [];

app.use(express.static('.'));

app.get('/',(req,res)=>{
    res.redirect('index.html')
})

io.on('connection', (socket)=> {

    for(var i in messages) {
    
    socket.emit("display message", messages[i]);
    
    }
    
    socket.on("send message", (data)=> {
    
    messages.push(data);
    
    io.sockets.emit("display message", data);
    
    });
    
    });

app.listen(3000);

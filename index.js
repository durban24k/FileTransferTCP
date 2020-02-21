let express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    upload = require("express-fileupload"),
    socket = require('socket.io');
const port = process.env.PORT || 3000;

//server listening method
var server = app.listen(port,()=>{
    console.log(`Server Listening on port ${port}`);
});
let io = socket(server);

//Body-Parser variable
let urlencodedParser = bodyParser.urlencoded(({ extended: false }));

//template engine
app.set('view engine','ejs');

//static files
app.use(express.static('public'));

//entry login.ejs page for username entry
app.get('/api',(req,res)=>{
    res.render('chat.ejs');
});

io.on('connection',(socket)=>{
    console.log(`Made a socket connection: ${socket.id}`);

    //Handle Chat Event
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    });

    //Handle Typing Event
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing', data);
    });
});

//File upload module

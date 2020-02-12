let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let socket = require('socket.io');

//server listening method
var server = app.listen(3000,()=>{
    console.log('Listening on port 3000');
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
//
//Make connection
let socket = io.connect('http://localhost:3000');

//Query DOM
let message = document.getElementById('message'),
    output = document.getElementById('output'),
    btn = document.getElementById('send'),
    attachBtn = document.getElementById('attachment'),
    fileInput = document.getElementById('file-input'),
    feedback = document.getElementById('feedback'),
    fileupload = document.getElementById('file-input');
    

//Uploading a file
attachBtn.addEventListener("click",()=>{
    fileInput.click();
});

//prompt username:
let username = prompt('Please Enter your handle:');
while(!username){
    alert("Please enter a username!!");
    username = prompt('Empty field!! Please Enter your handle:');
}
document.getElementById('handle').innerHTML += username;

//Listen Events
//--Using the Enter button to send
message.addEventListener("keyup",(e)=>{
    if(e.keyCode === 13){
        e.preventDefault();
        btn.click();
    }
});
//Event listener for the file input button
//fileInput.addEventListener
//--Using the button click to send the message
btn.addEventListener("click",()=>{
    //Timestamping on the text message
    let now = new Date();
    let time = now.toLocaleTimeString();
    if(message.value == ""){
        alert('Attach a Message or an Attachment!!!');
    }else{
        socket.emit('chat',{
            message:message.value,
            username:username,
            
        });
        message.value = "";
    }
});


//Emit Event
socket.on('chat',(data)=>{
    feedback.innerHTML = "";
    output.innerHTML+= '<p><strong>'+ data.username+': </strong>'+data.message+'<span>'+data.time+'</span></p>';
});

//Event Listeners
message.addEventListener("keypress",()=>{
    socket.emit('typing',username);
});
//--Emitting the "typing"
socket.on('typing',(data)=>{
    feedback.innerHTML = '<p><em>' + data + ' is typing....</em></p>';
});
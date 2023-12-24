const express = require('express');
const User = require('./models/UserModel');
const dotenv = require('dotenv');
const {default : mongoose } = require('mongoose');
const routes = require('./routes/api/api');
const cors = require('cors');
const io = require("socket.io")(8080, {
	cors: {
	  origin: "http://localhost:3000",
	},
});
const bodyParser = require('body-parser');
const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static('public'))  

routes(app);

const configViewEngine = require('./config/viewEngine');
configViewEngine(app); 

mongoose.connect(process.env.MONGODB_URI) 
.then(() => {  
    console.log('Connected to the database!'); 
}) 

.catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
})

let users = [];
io.on('connection', socket => {
    socket.broadcast.emit("hello","Chào mừng bạn đến với TB Technology");
    socket.on('addUser', async  userId => { 
        console.log('userId :>> ', userId);
        const checkuser = await User.findById(userId);
        nameUser = checkuser.name; 
        emailUser = checkuser.email;
        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            console.log('User Login: ', nameUser);
            const user = { userId, nameUser, emailUser, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
            console.log('users :>> ', users);    
        }
    });

    socket.on('logout', async userId => {
        const user = await User.findById(userId);
        console.log('UserLogout :>> ', user.name); 
        //const msg = 'User logout successfully';  
        //io.to(socket.id).emit('logoutUser', msg);
    });

    socket.on('sendMessage', async (socketId) => { 
        console.log('socketId :>> ', socketId);
        const user = users.find(user => user.socketId === socketId);
        io.to(socketId).emit('getMessage',user);
        });
    socket.on('sendMessageToAdmin', async (userId) => { 
        const user = users.find(user => user.userId === userId);
        io.emit('getMessageToAdmin', user);
    });

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
        console.log('users :>> ', users);   
    });
    //io.emit('getUsers', socket.userId);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});      
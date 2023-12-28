const express = require('express');
const User = require('./models/UserModel');
const dotenv = require('dotenv');
const {default : mongoose } = require('mongoose');
const routes = require('./routes/api/api');
const cors = require('cors');
const app = express();
const configViewEngine = require('./config/viewEngine'); 
configViewEngine(app); 

const http = require('http');
const socketConfig = require('./config/socket');
const server = http.createServer(app);
const io = socketConfig.init(server);

const bodyParser = require('body-parser');
dotenv.config();
const PORT = 3002;

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static('public'))  

routes(app);



mongoose.connect(process.env.MONGODB_URI) 
.then(() => {  
    console.log('Connected to the database!'); 
}) 

.catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
})

let users = [];
let lastAdminDisconnectTime = null;
let lastUserDisconnectTime = {};
io.on('connection', (socket) => {

    socket.on('addUser', async  userId => { 
        console.log('have user connect:>> ', users);    
        const checkuser = await User.findById(userId);
        nameUser = checkuser.name; 
        emailUser = checkuser.email;
        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            console.log('User Login: ', nameUser);
            const user = { userId, nameUser, emailUser, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
            io.to(socket.id).emit('chatStarted', 'Chào mừng bạn đến với TB Technology');
            console.log('users :>> ', users);    
        }else{
            console.log('User already exists');
            io.to(socket.id).emit('checkUserLogin', 'User already exists');
        }
    });
    io.emit('getUsers', users);  
    socket.on('requestGetUser', () => {
        io.emit('getUsers', users);
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
        const disconnectedUser = users.find(user => user.socketId === socket.id);
        if (disconnectedUser) {
            lastUserDisconnectTime[disconnectedUser.userId] = new Date();// Cập nhật thời gian ngắt kết nối của user
        }
        if (disconnectedUser && disconnectedUser.nameUser === 'admin') {
            lastAdminDisconnectTime = new Date(); // Cập nhật thời gian ngắt kết nối của admin
        }
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
        console.log('have user disconnect:>> ', users);
    });

    socket.on('checkUserStatus', (userId) => {
        const User = users.find(user => user.userId === userId);
        const isUserOnline = !!User;
        const lastDisconnect = lastUserDisconnectTime[userId] ? lastUserDisconnectTime[userId].toISOString() : null;
        io.to(socket.id).emit('userStatus',  { 
            isUserOnline, 
            lastDisconnect 
        });
    });

    socket.on('checkAdminStatus', () => {
        const adminUser = users.find(user => user.nameUser === 'admin');
        const isAdminOnline = !!adminUser;
        const lastDisconnect = lastAdminDisconnectTime ? lastAdminDisconnectTime.toISOString() : null;

        io.to(socket.id).emit('adminStatus', { 
            isAdminOnline, 
            lastDisconnect 
        });
    });
    //io.emit('getUsers', socket.userId);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
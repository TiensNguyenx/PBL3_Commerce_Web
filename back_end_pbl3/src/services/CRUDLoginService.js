const User = require('../models/UserModel');
const Notification = require('../models/NotificationModel');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const { generalAccessToken } = require('./JwtService');

const getLogin = async(userLogin) => {

        const { email, password} = userLogin;

        try{
            const checkUser = await User.findOne({email:email});
            if(checkUser == null){
                return {
                    status: 'error',
                    message: 'The user is not exist',
                  };
            }
            const comparePassword = await bcrypt.compareSync(password, checkUser.password);
            if(!comparePassword){
                return{
                    status: 'error',
                    message: 'The password is incorrect'
                }
            }
            
            const access_token = await generalAccessToken({
                id: checkUser._id, 
                isAdmin : checkUser.isAdmin
            });

                return{
                    status: 'success',
                    message: 'User login successfully',
                    access_token,
                    isAdmin: checkUser.isAdmin, 
                    //refresh_token
                }
        }catch(error){
            return {
            status: 'error',
            message: 'An error occurred while processing the login',
            error: error.message,
            };
        }
}

const postNotification = (data) => {
    return new Promise(async (resolve, reject) => {
    const {content} = data;
    try {
        const notification = await Notification.create({ content });
        resolve({
            status: 'OK',
            message: 'Notification created successfully',
            notification,
        });
    } catch (error) {
        reject(error);
    }
});
}

const getNotification = () => {
    return new Promise(async (resolve, reject) => {
    try {
        const notifications = await Notification.find();
        resolve({
            status: 'OK',
            message: 'Notifications found successfully',
            notifications,
        });
    } catch (error) {
        reject(error);
    }
});
}

module.exports = {
   getLogin,
   postNotification,
   getNotification
}
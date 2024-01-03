const CRUDLoginService = require('../services/CRUDLoginService');  
const jwt = require('jsonwebtoken');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');


// const getHomeLogin = async (req, res) => {
//     try {
//         return res.render('login.ejs');
//     } catch (e) {
//         return res.status(404).json({
//             message: e.message || 'Error fetching users',
//         });
//     }
// }

// const postLogin = async (req, res) => {
//   try {
//     const response = await CRUDLoginService.getLogin(req.body);
//     if (response.status === 'success') {
//       if (response.isAdmin) {
//         return res.render('login.ejs', { access_token: response.access_token });
//         // res.redirect('/admin/user/');
//       } else {
//         return res.render('login.ejs', { error: 'This user is not admin' });
//       }
//     } else {
//       return res.render('login.ejs', { error: response.message });
//     }
//   } catch (error) {
//     return res.status(500).json({ 
//       message: 'Internal server error',
//       error: error.message,
//     });
//   }
// };

// const postLogout = async (req, res) => {
//   try {
//     res.redirect('/admin');
//   } catch (error) { 
//     return res.status(500).json({ 
//       message: 'Internal server error',
//       error: error.message,
//     });
//   }
// };
const publickey = path.resolve(__dirname, '..', 'config', 'publickey.crt');
const cert = fs.readFileSync(publickey);

const postAuth = async (req, res) => {
  const token = req.headers.token
  jwt.verify(token, cert,{algorithm: 'RS256'}, function(err, user){
      if(err){
          return res.status(404).json({
              status: 'ERR',
              message: 'Unauthorized'
          })
      }
      const  {payload} = user
      if(payload?.isAdmin){
          return res.status(200).json({
              status: 'OK',
              message: 'Authorized'
          })
      }else{
          return res.status(200).json({
              status: 'ERR',
              message: 'Unauthorized'
          })
      }
  });
};

const postNotification = async (req, res) => {
  try {
    const response = await CRUDLoginService.postNotification(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const getNotification = async (req, res) => {
  try {
    const response = await CRUDLoginService.getNotification();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message,
    });
  }
}
module.exports = {
    // getHomeLogin,
    // postLogin,
    // postLogout,
    postAuth,
    postNotification,
    getNotification
    
}
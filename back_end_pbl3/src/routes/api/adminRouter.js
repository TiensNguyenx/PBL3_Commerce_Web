const express = require('express');
const router = express.Router();
const { getHomeLogin, postLogin,postLogout,postAuth,postNotification ,getNotification} = require('../../controllers/adminLoginController');
const {authMiddleware} = require('../../middleware/authMiddleware');


// router.get('/', getHomeLogin);

// router.post('/login', postLogin);
// router.get('/logout', postLogout);
router.post('/auth', postAuth);
router.post('/post-notification', postNotification);
router.get('/get-notification', getNotification);
// router.get('/logoutPage/:id', getLogoutPage);

// router.post('/logout', getLogout);

module.exports = router; //export default router
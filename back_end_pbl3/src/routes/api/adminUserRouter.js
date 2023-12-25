const express = require('express');
const router = express.Router();
const { getHomepage, createUser, getOrderUser, getPaymentUser, getUpdatePage, updateUser, deleteUser, getDetailUser} = require('../../controllers/adminUserController');
const { authMiddleware} = require('../../middleware/authMiddleware');

router.get('/', getHomepage);

router.get('/detail-user/:id', getDetailUser);

router.post('/create-user', createUser);

router.post('/update-user/:id', updateUser);

router.post('/delete-user/:id', deleteUser);

// router.get('/order/:id', getOrderUser);

// router.get('/payment/:id', getPaymentUser);

module.exports = router; //export default router
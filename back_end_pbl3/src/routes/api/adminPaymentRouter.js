const express = require('express');
const router = express.Router();
const { getHomepage, getDetailPayment,sortPayment} = require('../../controllers/adminPaymentController');

router.get('/', getHomepage);

router.get('/detail-payment/:id', getDetailPayment);

router.get('/sort', sortPayment);

module.exports = router;
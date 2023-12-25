const express = require('express');
const router = express.Router();
const { getHomepage, getAllOrderManagementByYear, getDetailsOrder,getDetailsOrderItems, sortOrder, getAllOrderManagement} = require('../../controllers/adminOrderController');

router.get('/', getHomepage);

router.get('/detail-order/:id', getDetailsOrder);

router.get('/detail-order-item/:id', getDetailsOrderItems);

router.get('/sort', sortOrder);

router.get('/all-order-chart', getAllOrderManagement);

router.get('/all-order-chart-by-year', getAllOrderManagementByYear);

module.exports = router; //export default router 
const express = require('express');
const router = express.Router();
const { getHomepage,createCoupon,getDetailsCoupon,updateCoupon,deleteCoupon } = require('../../controllers/adminCouponController');

router.get('/', getHomepage);

router.get('/create', createCoupon);

router.get('/detail-coupon/:id', getDetailsCoupon);

router.post('/update-coupon/:id', updateCoupon);

router.post('/delete-coupon/:id', deleteCoupon);

module.exports = router; //export default router
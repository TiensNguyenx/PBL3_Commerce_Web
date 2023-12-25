const express = require('express');
const router = express.Router();
const { getHomepage, getDetailProduct, getRatingProduct, createProduct, updateProduct, deleteProduct,sortProduct,searchProduct } = require('../../controllers/adminProductController');
const { getDetailsProduct } = require('../../services/ProductService');

router.get('/', getHomepage);

router.post('/create-product', createProduct);

router.post('/update-product/:id', getDetailProduct);

router.post('/update-product/:id', updateProduct);

router.post('/delete-product/:id', deleteProduct);

router.get('/rating/:id', getRatingProduct);

router.get('/sort', sortProduct);

router.get('/search', searchProduct);

module.exports = router; //export default router
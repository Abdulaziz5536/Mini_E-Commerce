const express = require('express');
const productRouter = express.Router();
const {addProduct,listProduct,listSingleProduct,removeProduct} = require('../controllers/product-controller');
const {protect,admin} = require('../middleware/auth-middleware');


productRouter.post('/add',protect,admin,addProduct);
productRouter.get('/list',listProduct);
productRouter.get('/listsingle/:id',listSingleProduct);
productRouter.delete('/:id',protect,admin,removeProduct);

module.exports = productRouter;
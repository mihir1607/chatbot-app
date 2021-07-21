const express = require('express');
const Product = require('../models/product');
const auth = require('../middleware/auth');
const router = new express.Router();
// Router method to get list of products
router.get('/products', auth, async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});
// Router method to post new product
router.post('/products', async (req, res) => {
    const product = new Product(req.body);

    try {
        await product.save();
        res.status(201).send({ product });
    } catch (error) {
        res.status(400).send(error);
    };
});

module.exports = router;
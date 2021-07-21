const mongoose = require('mongoose');
// Declaring Schema for a product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const itemScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: String,
    stock: Number
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemScheme)
module.exports = Item
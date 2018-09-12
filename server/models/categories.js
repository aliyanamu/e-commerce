const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const categoryScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    itemlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',  
    }]
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categoryScheme)
module.exports = Category
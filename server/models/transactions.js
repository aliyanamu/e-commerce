const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const transScheme = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    itemlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }]
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transScheme)
module.exports = Transaction
const Item = require('../models/items'),
      ObjectId = require('mongodb').ObjectId;

module.exports = {

    list: (req, res) => {
        Item.find( (err, items) => {
            if (!err) {
                res.status(200).json({
                    items: items
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    insert: (req, res) => {
        Item.create({
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            stock: req.body.stock
        }, function (err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully added item: ${req.body.name}`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    update: (req, res) => {  
        const upd = {
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            stock: req.body.stock
        }

        Item.updateOne({
            _id: ObjectId(req.params.id)
        }, upd, function(err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully updated item: ${req.body.name}`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    remove: (req, res) => {
        Item.deleteOne({
            _id: ObjectId(req.params.id)
        }, function(err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully deleted item`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    }
}
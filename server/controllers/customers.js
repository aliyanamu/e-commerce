const Customer = require('../models/customers'),
      ObjectId = require('mongodb').ObjectId;

module.exports = {

    list: (req, res) => {
        Customer.find( (err, customers) => {
            if (!err) {
                res.status(200).json({
                    customers: customers
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    insert: (req, res) => {
        Customer.create({
            name: req.body.name,
            memberid: req.body.memberid,
            address: req.body.address,
            zipcode: req.body.zipcode,
            phone: req.body.phone
        }, function (err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully added customer: ${req.body.name}`
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
            memberid: req.body.memberid,
            address: req.body.address,
            zipcode: req.body.zipcode,
            phone: req.body.phone
        }

        Customer.updateOne({
            _id: ObjectId(req.params.id)
        }, upd, function(err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully updated customer: ${req.body.name}`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    remove: (req, res) => {
        Customer.deleteOne({
            _id: ObjectId(req.params.id)
        }, function(err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully deleted customer`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    }
}
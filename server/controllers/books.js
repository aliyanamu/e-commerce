const Book = require('../models/books'),
      ObjectId = require('mongodb').ObjectId;

module.exports = {

    list: (req, res) => {
        Book.find( (err, books) => {
            if (!err) {
                res.status(200).json({
                    books: books
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    insert: (req, res) => {
        Book.create({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: req.body.stock
        }, function (err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully added book: ${req.body.title}`
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
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: req.body.stock
        }

        Book.updateOne({
            _id: ObjectId(req.params.id)
        }, upd, function(err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully updated book: ${req.body.title}`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    remove: (req, res) => {
        Book.deleteOne({
            _id: ObjectId(req.params.id)
        }, function(err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully deleted book`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    }
}
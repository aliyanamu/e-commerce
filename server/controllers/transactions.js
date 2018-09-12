const Transaction = require('../models/transactions'),
      ObjectId = require('mongodb').ObjectId,
      { dueDate, fine } = require('../helpers/helpList')

module.exports = {

    list: (req, res) => {
        Transaction.find()
        .populate('booklist')
        .exec(function (err, transactions) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            } else {
                res.status(200).json({
                    transactions: transactions
                })
            }
            
          });
    },

    insert: (req, res) => {
        let arrBook = []
        req.body.booklist.forEach(elem => {
            bookId = ObjectId(elem)
            arrBook.push(bookId)
        });

        let trans = new Transaction({
            member: req.body.memberId,
            days: req.body.days,
            due_date: dueDate(req.body.days),
            booklist: arrBook
        });

        trans.save(function (err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully made borrow transactions`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    update: (req, res) => {  
        Transaction.findOne({_id: ObjectId(req.params.id)})
        .then(trans => {
            let itsfine = fine(trans.due_date)
            Transaction.updateOne({
                _id: ObjectId(req.params.id)
            }, {
                in_date: new Date(),
                fine: itsfine
            })
            .then(() => {
                res.status(200).json({
                    message: `succesfully updated transaction`
                })
            })  
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    remove: (req, res) => {
        Transaction.deleteOne({
            _id: ObjectId(req.params.id)
        }, function(err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully deleted transaction`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    }
}
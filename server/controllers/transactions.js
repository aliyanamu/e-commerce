const Transaction = require("../models/transactions"),
      ObjectId = require("mongodb").ObjectId;

module.exports = {
  list: (req, res) => {
    Transaction.find()
      .populate("itemlist")
      .exec(function(err, transactions) {
        if (err) {
          res.status(500).json({
            message: err.message
          });
        } else {
          res.status(200).json({
            transactions: transactions
          });
        }
      });
  },

  insert: (req, res) => {
    
    let trans = new Transaction({
      user: req.body.user,
      itemlist: req.body.itemlist
    });

    trans.save(function(err) {
      if (!err) {
        res.status(200).json({
          message: `succesfully made transaction`
        });
      } else {
        res.status(500).json({
          message: err.message
        });
      }
    });
  },

  remove: (req, res) => {
    Transaction.deleteOne(
      {
        _id: ObjectId(req.params.id)
      },
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully deleted transaction`
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      }
    );
  }
};

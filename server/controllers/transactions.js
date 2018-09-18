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

  getMyCart: (req, res) => {
    console.log("===>", userId);

    Transaction.find({
      userId: userId
    })
      .populate("userId")
      .then(data => {
        res.status(201).json({
          message: `list of items in my cart`,
          data
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  },

  findById: (req, res) => {
    Transaction.findOne({
      userId: ObjectId(req.params.id)
    })
      .populate("itemlist")
      .exec(function(err, categories) {
        if (!err) {
          res.status(200).json({
            categories: categories
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      });
  },

  insert: (req, res) => {
    console.log(req.body)
    let trans = new Transaction({
      user: req.userId
    });
    trans.save(function(err) {
      if (!err) {
        res.status(200).json({
          message: `succesfully made transaction`,
          trans
        });
      } else {
        res.status(500).json({
          message: err.message
        });
      }
    });
  },

  update: (req, res) => {
    const upd = {
      itemlist: req.body.itemlist
    };
    Transaction.updateOne({
        _id: req.userId
      }, upd, function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully updated transactions`
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      }
    );
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

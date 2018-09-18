const User = require("../models/users"),
  jwt = require("jsonwebtoken"),
  Transaction = require("../models/transactions");

module.exports = {
  isLogin: function(req, res, next) {
    let token = req.headers.token;
    if (token) {
      jwt.verify(token, process.env.ACCESS_KEY, function(err, decoded) {
        if (!err) {
          User.findById(decoded.userId)
            .then(function(user) {
              req.userId = decoded.userId;
              next();
            })
            .catch(function() {
              res.status(500).json({
                message: `access denied`
              });
            });
        } else {
          res.status(500).json({
            message: `access denied`
          });
        }
      });
    }
  },

  authdulu: function(req, res, next) {
    Transaction.findOne({
      userId: req.params.id
    })
      .populate("userId")
      .then(function(transaction) {
        next();
      })
      .catch(function(err) {
        res.status(500).json({
          message: `access denied`
        });
      });
  }
};

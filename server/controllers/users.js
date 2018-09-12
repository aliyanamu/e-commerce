const hashPass = require("../helpers/hashPass");

const User = require("../models/users"),
  ObjectId = require("mongodb").ObjectId;

  console.log(hashPass('apaaja'))
module.exports = {
  list: (req, res) => {
    User.find()
      .then(user => {
        res.status(200).json({
          user: user
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
  },

  insert: (req, res) => {
    console.log(name, email, password, phone);
    console.log(typeof name, typeof email, typeof password, typeof phone);

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone
    })
      .then(user => {
        res.status(200).json({
          message: `succesfully added user: ${req.body.name}`
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
  },

  update: (req, res) => {
    const upd = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone
    };
    User.updateOne(
      {
        _id: ObjectId(req.params.id)
      },
      upd,
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully updated user: ${req.body.name}`
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
    User.deleteOne(
      {
        _id: ObjectId(req.params.id)
      },
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully deleted user`
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

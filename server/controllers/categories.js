const Category = require("../models/categories"),
  ObjectId = require("mongodb").ObjectId;

module.exports = {
  list: (req, res) => {
    Category.find()
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

  findById: (req, res) => {
    Category.findOne({
      _id: ObjectId(req.params.id)
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
    let cat = new Category({
      name: req.body.name
    });

    cat.save(function(err) {
      if (!err) {
        res.status(200).json({
          message: `succesfully made category`
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
      name: req.body.name,
      itemlist: req.body.itemlist
    };

    Category.updateOne(
      {
        _id: ObjectId(req.params.id)
      },
      upd,
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully updated category`
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
    Category.deleteOne(
      {
        _id: ObjectId(req.params.id)
      },
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully deleted category`
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

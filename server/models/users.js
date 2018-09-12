let hashPass = require("../helpers/hashPass");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userScheme = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone: String
  },
  {
    timestamps: true
  }
);

userScheme.pre("save", function(next) {
  this.password = hashPass(this.password);
  next();
});

const User = mongoose.model("User", userScheme);
module.exports = User;

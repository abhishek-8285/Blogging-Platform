const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt:{
      type:Date,
      default:null
    }
  },
  { timestamps: true }
);

userSchema.index({email:'text',name:'text'})

module.exports = mongoose.model("user", userSchema);

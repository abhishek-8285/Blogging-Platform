const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      name:{
        type:String,
        required:true
      },
      authorId:{type: mongoose.Schema.Types.ObjectId,
      ref:'user',
      required: true,}
    },
    contend: {
      type: String,
      required: true,
      trim: true,
    },
    image:{
      type:String,
      required:true
    }
    ,
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

blogSchema.index({title:'text',content:'text'})


module.exports = mongoose.model("Blog", blogSchema);

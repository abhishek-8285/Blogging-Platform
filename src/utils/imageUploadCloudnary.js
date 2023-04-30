const cloudinary = require("cloudinary").v2;
const fs = require('fs')
require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDAPISECRET
  });

const uploadImage = async (req, res, next) => {
  try {
    if(!req?.file){
      return next()
    }
    const file = req.file
    const locationUrl = await cloudinary.uploader.upload(file.path);
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`File ${file.path} has been deleted.`);
    });
    req.file.path=locationUrl.url
    next()
  } catch (error) {
    console.log(error);
    res.status(500).send({message:'server error', status:false ,error:error.message})
  }
};

module.exports = uploadImage

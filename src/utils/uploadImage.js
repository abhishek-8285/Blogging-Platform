const multer = require("multer");
const ErrorHandler = require("./errorHandler");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/image");
  },
  filename: (req, file, cb) => {
    cb(null, "BlogImg" + Date.now() + "." + file?.mimetype.split("/")[1]);
  },
});

const storageUpdate = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/image");
  },
  filename: (req, file, cb) => {
    cb(null, "BlogImg" + Date.now() + "." + file?.mimetype.split("/")[1]);
  },
});

module.exports.upload = multer({
  limits: { fileSize: 200000},
  fileFilter: (req, file, cb) => {
    const obj = { "image/png": 1, "image/jpg": 1, "image/jpeg": 1 };

    if (obj[file.mimetype] === 1) cb(null, true);
    else {
      cb(null, false);
      return cb(
        new ErrorHandler("only .png, .jpg and .jpeg format allowed!", 400)
      );
    }
  },
  storage: storage,
});
module.exports.uploadUpload = multer({
  limits: { fileSize: 200000},
  fileFilter: (req, file, cb) => {
    const obj = { "image/png": 1, "image/jpg": 1, "image/jpeg": 1 };

    if (obj[file.mimetype] === 1) cb(null, true);
    else {
      cb(null, false);
      return cb(
        new ErrorHandler("only .png, .jpg and .jpeg format allowed!", 400)
      );
    }
  },
  storage: storageUpdate,
});

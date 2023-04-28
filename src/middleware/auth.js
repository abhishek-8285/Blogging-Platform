const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

const authentication = (req, res, next) => {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      token = req.headers["X-API-KEY"];
    }
    if (!token) {
      return next(new ErrorHandler("token is required", 401));
    }
    const decodedToken = jwt.verify(token, "assignment", function (err, data) {
      if (err) {
        return err;
      } else {
        return data;
      }
    });
    if (decodedToken?.message) {
        return next(new ErrorHandler(decodedToken.message, 401))
    }
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message))
  }
};

module.exports.authentication = authentication;

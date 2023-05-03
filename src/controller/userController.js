const userModel = require("../models/userModel");
const { userBodySchema, loginBodySchema } = require("../utils/validateBody");
const {isValidObjectId} = require('mongoose')
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const body = req.body;
    const result = userBodySchema.validate(body);
    const { error } = result;
    if (error?.details) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }
    const createdData = await userModel.create({
      ...body,
    });
    res.status(201).send({
      status: true,
      message: `user is created successfully`,
      data: createdData,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const allUserData = await userModel.find().select({ password: 0 });
    if (!allUserData.length) {
      return next(new ErrorHandler("user not found", 404));
    }
    res.status(200).send({
      status: true,
      message: `user is created successfully`,
      data: allUserData,
    });
  } catch (error) {
    return next(error);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const id = req.params["id"];
    if (!isValidObjectId(id)) {
      return next(new ErrorHandler("user id is not valid", 400));
    }
    const userData = await userModel.findById(id);
    if (!userData) {
      return next(new ErrorHandler("user not found", 404));
    }
    res.status(200).send({
      status: true,
      message: `user fetch`,
      data: userData,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const body = req.body;
    const result = loginBodySchema.validate(body);
    const { error } = result;
    if (error?.details) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const findUser = await userModel.findOne({
      email: body.email,
      isDeleted: false,
    });

    if (!findUser) {
      return next(new ErrorHandler("user not found", 404));
    }

    if (findUser.password === body.password) {
      const token = jwt.sign(
        {
          id: findUser._id,
          iat: new Date().getTime(),
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        },
        "assignment"
      );
      req.headers["x-api-key"] = token;
      return res
        .status(201)
        .send({ status: true, message: "token created", token: token ,userId:findUser._id});
    }
    return next(new ErrorHandler("invaild password", 401));
  } catch (error) {
    return next(error);
  }
};

module.exports.login = login;
module.exports.registerUser = registerUser;
module.exports.getAllUser = getAllUser;
module.exports.getUserById = getUserById;

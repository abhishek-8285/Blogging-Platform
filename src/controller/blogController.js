const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const { isValidObjectId } = require("mongoose");
const {
  updateBlogBodySchema,
  blogBodySchema,
  validateBodyDateSchema,
} = require("../utils/validateBody");
const ErrorHandler = require("../utils/errorHandler");
const upload = require("../utils/uploadImage");

const createBlog = async (req, res, next) => {
  try {
    const body = req.body;
    const decodedToken = req.decodedToken;
    if (decodedToken.id !== body.author) {
      return next(
        new ErrorHandler(
          `User logged is not authorized to access & manipulate other's data`,
          403
        )
      );
    }
    const result = blogBodySchema.validate(body);
    const { error } = result;
    if (error?.details) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }
    if (!req?.file) {
      return next(new ErrorHandler("image is required", 400));
    }
    if (req?.file?.path) {
      body["image"] = req.file.path;
    }
    const findUser = await userModel.findById(body?.author);
    if (!findUser) {
      return next(new ErrorHandler("user not found", 404));
    }
    body["author"] = {
      authorId: body.author,
      name: findUser.name,
    };
    const createdData = await blogModel.create({ ...body });
    res.status(201).send({
      status: true,
      message: `blog created successfuly`,
      data: createdData,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blogid = req.params["blogid"];
    if (!isValidObjectId(blogid)) {
      return next(new ErrorHandler("blog id is not valid", 400));
    }
    const findBlogById = await blogModel.findOne({
      _id: blogid,
      isDeleted: false,
    });
    if (!findBlogById) {
      return next(new ErrorHandler("blog not found", 404));
    }
    res.status(200).send({
      status: true,
      message: `blog is fetch by id`,
      data: findBlogById,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllBlog = async (req, res, next) => {
  try {
    const findObject = { isDeleted: false };
    const dateObj = {};
    const query = req.query;
    const result = validateBodyDateSchema.validate(query);
    const { error } = result;
    if (error?.details) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    let { page, size, keyword, startdate, enddate } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    if (query?.author) {
      findObject["author.name"] = query.author;
    }

    if (query?.keyword) {
      findObject["contend"] = { $regex: keyword, $options: "i" };
    } else if (query?.startdate && query?.enddate) {
      if (startdate > enddate) {
        return next(new ErrorHandler("date range error ", 400));
      }
      const startDate = new Date(startdate);
      dateObj["$gte"] = startDate;
      const endDate = new Date(enddate);
      dateObj["$lte"] = endDate;
      findObject[`createdAt`] = dateObj;
    } else if (startdate) {
      const startDate = new Date(startdate);
      dateObj["$gte"] = startDate;
      findObject[`createdAt`] = dateObj;
    } else if (enddate) {
      const endDate = new Date(enddate);
      dateObj["$lte"] = endDate;
      findObject[`createdAt`] = dateObj;
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size;

    const findAllBlog = await blogModel
      .find({ ...findObject })
      .populate("author.authorId")
      .limit(limit)
      .skip(skip);
    if (!findAllBlog.length) {
      return next(new ErrorHandler("blog not fount", 404));
    }
    const totalDocuments = await blogModel.countDocuments({...findObject});
    const totalPages = Math.ceil(totalDocuments / limit);
    res.status(200).send({
      status: true,
      message: ` all blog is fetch `,
      data: findAllBlog,
      currentPage: page,
      totalPages:totalPages,
      hasNextPage: limit * page < totalDocuments,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    return next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const id = req.params["id"];
    const blogid = req.params["blogid"];
    if (!isValidObjectId(id)) {
      return next(new ErrorHandler("user id is not valid", 400));
    }
    if (!isValidObjectId(blogid)) {
      return next(new ErrorHandler("blog id is not valid", 400));
    }

    const decodedToken = req.decodedToken;
    if (decodedToken.id !== id) {
      return next(
        new ErrorHandler(
          `User logged is not authorized to access & manipulate other's data`,
          403
        )
      );
    }
    if (!req?.file && !Object.keys(req.body).length) {
      return next(new ErrorHandler("to update blog need some fields", 400));
    }
    const body = req.body;

    const result = updateBlogBodySchema.validate(body);
    const { error } = result;
    if (error?.details) {
      console.log(error);
      return next(new ErrorHandler(error.details[0].message, 400));
    }
    if (req?.file?.path) {
      body["image"] = req.file.path;
    }

    const findBlog = await blogModel.findOne({
      _id: blogid,
      "author.authorId": id,
      isDeleted: false,
    });
    if (!findBlog) {
      return next(new ErrorHandler("blog not found by id", 404));
    }
    const updatedBlog = await blogModel.findByIdAndUpdate(
      blogid,
      { $set: { ...body } },
      { new: true }
    );
    res
      .status(200)
      .send({ status: true, message: `blog is updated `, data: updatedBlog });
  } catch (error) {
    return next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const id = req.params["id"];
    const blogid = req.params["blogid"];
    if (!isValidObjectId(id)) {
      return next(new ErrorHandler("user id is not valid", 400));
    }
    if (!isValidObjectId(blogid)) {
      return next(new ErrorHandler("blog not found by id", 404));
    }

    const decodedToken = req.decodedToken;
    if (decodedToken.id !== id) {
      return next(
        new ErrorHandler(
          `User logged is not authorized to access & manipulate other's data`,
          403
        )
      );
    }
    const findBlog = await blogModel.findOne({
      _id: blogid,
      "author.authorId": id,
      isDeleted: false,
    });
    if (!findBlog) {
      return next(new ErrorHandler("blog not found by id", 404));
    }
    const deletedBlog = await blogModel.findByIdAndUpdate(blogid, {
      $set: { isDeleted: true, deletedAt: new Date().toISOString() },
    });
    res.status(200).send({ status: true, message: `blog is deleted ` });
  } catch (error) {
    return next(error);
  }
};

module.exports.createBlog = createBlog;
module.exports.getBlogById = getBlogById;
module.exports.getAllBlog = getAllBlog;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;

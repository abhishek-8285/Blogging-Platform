const joi = require("joi");

const blogBodySchema = joi.object({
  title: joi.string().min(3).max(150).required(),
  author: joi.string().hex().length(24).required(),
  content: joi.string().min(15).required(),
});

const userBodySchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .message("email must be like this abc@gmail.com")
    .required(),
  name: joi
    .string()
    .pattern(new RegExp(/^([a-zA-Z. , ]){1,100}$/))
    .required(),
  password: joi
    .string()
    .pattern(
      new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/)
    )
    .message("password must be like this Abc@123")
    .required({ message: "password is required" }),
});

const loginBodySchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .message("email must be like this abc@gmail.com")
    .required(),
  password: joi
    .string()
    .pattern(
      new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/)
    )
    .message("password must be like this Abc@123")
    .required({ message: "password is required" }),
});

const updateBlogBodySchema = joi.object({
    title:joi.string().min(3).max(150),
    content:joi.string().min(15)
})

const validateBodyDateSchema = joi.object({
  startdate:joi.string().isoDate().message('date formate should be YYYY-MM-DD'),
  enddate:joi.string().isoDate().message('date formate should be YYYY-MM-DD'),
  page:joi.string().pattern(/^[0-9]+$/).message('page should be only number'),
  author:joi.string()
  .pattern(new RegExp(/^([a-zA-Z. , ]){1,100}$/)).message('name only contain alphabetical value'),
  keyword:joi.string().min(2).message('to search any blog by keyword keyword should be greater than 2')
})

module.exports.validateBodyDateSchema=validateBodyDateSchema
module.exports.updateBlogBodySchema = updateBlogBodySchema;
module.exports.loginBodySchema = loginBodySchema;
module.exports.userBodySchema = userBodySchema;
module.exports.blogBodySchema = blogBodySchema;

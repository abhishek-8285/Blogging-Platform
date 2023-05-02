const route = require("express").Router();
const {
  registerUser,
  getAllUser,
  getUserById,
  login,
} = require("./controller/userController");
const {
  createBlog,
  getBlogById,
  getAllBlog,
  updateBlog,
  deleteBlog,
} = require("./controller/blogController");
const { authentication } = require("./middleware/auth");
const { upload } = require("./utils/uploadImage");
const uploadImage = require("./utils/imageUploadCloudnary");

// ---user api
route.post("/registeruser", registerUser);
route.get("/getuser/:id", authentication, getUserById);
route.get("/alluser", authentication, getAllUser);
route.post("/login", login);

//--- blog api
route.post(
  "/createblog",
  authentication,
  upload.single("image"),
  uploadImage,
  createBlog
);
route.get("/getblog/:blogid", authentication, getBlogById);
route.get("/allblog", authentication, getAllBlog);
route.put(
  "/:id/updateblog/:blogid",
  authentication,
  upload.single("image"),
  uploadImage,
  updateBlog
);
route.delete("/:id/deleteblog/:blogid", authentication, deleteBlog);

route.all("*", (req, res) => {
  return res.status(404).send({ status: false, message: `no route found` });
});

module.exports = route;

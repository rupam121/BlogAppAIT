import Blog from "../model/BlogSchema.js";
// import User from "../model/UserSchema.js";

export const createBlog = async (req, res, next) => {
  const { title, content, topic } = req.body;
  try {
    let blog = new Blog({ title, content, topic });
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog is Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong in Blog Creation",
    });
  }
};

// get all bologs

export const getAllBlog = async (req, res, next) => {
  try {
    const blog = await Blog.find({});
    res.status(200).json({
      success: true,
      message: "Blog  Successfully found.",
      data: blog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog not found.",
    });
  }
};

export const getSingleBlog = async (req, res, next) => {};

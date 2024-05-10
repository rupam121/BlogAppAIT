// createBlog, editBlog, DeleteNlog, GetAllBlog

import express from "express";
import { createBlog, getAllBlog ,getSingleBlog } from "../controller/blogCoontroler.js";

const router = express.Router();

router.post("/createNewBlog", createBlog);
router.get("/allBlogs", getAllBlog);
router.get("/singleblog/:id", getSingleBlog);

export default router;

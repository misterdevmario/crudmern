import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, desc } = req.body;
    let image;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newPost = new Post({ title, desc, image });
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updateImage = await Post.findById(req.params.id);
    if (updateImage.image.public_id) {
      await deleteImage(updateImage.image.public_id);
    }

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndRemove(req.params.id);
    if (!postRemoved) return res.status(404);
    if (postRemoved.image.public_id) {
      await deleteImage(postRemoved.image.public_id);
    }

    return res.status(204).json(postRemoved);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.send("Not Found");
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

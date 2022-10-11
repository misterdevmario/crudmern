import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dqrtcb1vl",
  api_key: "292437823597285",
  api_secret: "abU0fhlKOC_MArXMbmdl2mBOGf4",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "merncrud",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

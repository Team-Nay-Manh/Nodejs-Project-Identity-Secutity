import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import pkg from "cloudinary"
import {
  CLOUDINARY_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
} from "../config/env.js"

const { v2: cloudinary } = pkg

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
})

const getUploadFolder = (req) => {
  if (req.baseUrl.includes("products")) return "products"
  if (req.baseUrl.includes("categories")) return "categories"
  return "general" // Default folder if no match
}
// Cấu hình storage trên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const name =
      req.body.name?.trim().toLowerCase().replace(/\s+/g, "-") ||
      Date.now().toString()
    return {
      folder: getUploadFolder(req),
      format: "png",
      public_id: name + "-" + Date.now(),
    }
  },
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."),
      false
    )
  }
}

// Cấu hình Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
})

export default upload

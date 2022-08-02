const express = require("express");
const router = express.Router();
const { onlyAuthUser } = require("../middlewares/auth");

const upload = require("../services/multer");
//'image' key needed
const singleImageUpload = upload.single("image");
//utils
const { dataUri } = require("../services/dataUri");
const { cloudinaryUpload } = require("../services/cloudinary");
//mongoose Model
const CloudinaryImage = require("../models/cloudinary-image");

const singleUploadCtrl = (req, res, next) => {
  singleImageUpload(req, res, (err) => {
    if (err) {
      return res.status(422).sendApiError({
        title: "Image Upload Error",
        detail: err.message,
      });
    }
    next();
  });
};

router.post("/", onlyAuthUser, singleUploadCtrl, async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No image presented!!");
    }
    const file64 = dataUri(req.file);
    // "provide a base64 string representation of the image in cloudinary upload function"
    const result = await cloudinaryUpload(file64.content);
    // content:'image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'

    const cloudinaryImage = new CloudinaryImage({
      url: result.secure_url,
      cloudinaryId: result.public_id,
    });
    const savedImage = await cloudinaryImage.save();

    res.json({ _id: savedImage._id, url: savedImage.url });
  } catch (error) {
    return res.status(500).sendApiError({
      title: "Image Upload Error",
      detail: "Something went wrong",
    });
  }
});

/* req.file
{
  fieldname: 'image',
  originalname: 'f184.png',
  encoding: '7bit',
  mimetype: 'image/png',
  buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 0b 40 00 00 07 08 08 06 00 00 00 af e4 40 15 00 00 0c 61 69 43 43 50 49 43 43 20 50 72 6f 66 69 ... 401453 more bytes>,
  size: 401503
} req.file
*/

module.exports = router;

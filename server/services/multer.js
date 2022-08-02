const multer = require("multer");

// disc storage - to folder
// in memory storage, in buffer

const ALLOWED_FORMATS = ["image/png", "image/jpeg", "image/jpg"];

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file format not supported"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 10mb
  },
});
module.exports = upload;

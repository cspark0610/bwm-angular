const Datauri = require("datauri/parser");
const path = require("path");
const dUri = new Datauri();

//converts buffer into base64 string representation of the image, to upload it to cloudinary
exports.dataUri = (file) =>
  dUri.format(path.extname(file?.originalname).toString(), file.buffer);
////=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."

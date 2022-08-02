const cloudinary = require("cloudinary").v2;
const config = require("../config/dev");

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

exports.cloudinaryUpload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file);
    return result;
  } catch (error) {
    console.log(error, "error in cloudinary upload");
    throw new Error(error);
  }
};

/* result success
{
  asset_id: 'd896f41757ad5155a430bfbac8f7b683',
  public_id: 'ojcxyuihr7gl9dypybzd',
  version: 1659455937,
  version_id: '99df90e7f2bd23196530067be4a20ef7',
  signature: '82a112cce348a6e768636cc20f95953be9353e40',
  width: 2880,
  height: 1800,
  format: 'png',
  resource_type: 'image',
  created_at: '2022-08-02T15:58:57Z',
  tags: [],
  bytes: 401503,
  type: 'upload',
  etag: 'cc38f463a3e065bed2fe5cd548d5744a',
  placeholder: false,
  url: 'http://res.cloudinary.com/dggqfqhaf/image/upload/v1659455937/ojcxyuihr7gl9dypybzd.png',
  secure_url: 'https://res.cloudinary.com/dggqfqhaf/image/upload/v1659455937/ojcxyuihr7gl9dypybzd.png',
  api_key: '629689759844437'
} result
*/

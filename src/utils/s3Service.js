const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { AWS_BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION } = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_BUCKET_REGION,
});

const s3 = new AWS.S3();

// Create an S3 storage engine for multer
const s3Storage = multerS3({
  s3: s3,
  bucket: AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    const imageKey = `images/${Date.now()}_${file.fieldname}`;
    cb(null, imageKey);
  },
});

// Create a multer instance that uses S3 storage
const upload = multer({ storage: s3Storage });

const handleImageUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'FILE_UPLOAD_ERROR' });
    }

    // Construct the imageUrl
    const imageUrl = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`;
    // Pass the imageUrl to a callback or resolve a promise with it
    // res.status(200).json({ imageUrl }); // Return it in the response
    next();
  });
};

module.exports = { s3, upload, handleImageUpload };

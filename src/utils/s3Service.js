// AWS S3 v3
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { AWS_BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION } =
  process.env;

const awsConfig = {
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
};

const s3Client = new S3Client(awsConfig);

// Create an S3 storage engine for multer
const s3Storage = multerS3({
  s3: s3Client,
  bucket: AWS_BUCKET_NAME,
  // contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    const imageKey = `images/${Date.now()}_${file.fieldname}`;
    cb(null, imageKey);
  },
});
// Create a multer instance that uses S3 storage
const upload = multer({ storage: s3Storage });

const handleImageUpload = (req, res, next) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "FILE_UPLOAD_ERROR" });
      }
      next();
    });
  } catch (error) {
    console.log(error)
  }
  
};

module.exports = { s3Client, upload, handleImageUpload };

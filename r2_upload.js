/**
 * Cloudflare R2 File Upload Script using AWS SDK v3
 * * Required Packages:
 * npm install @aws-sdk/client-s3
 */

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

// Environment Variables required:
// R2_ACCOUNT_ID: Cloudflare Account ID
// R2_ACCESS_KEY_ID: R2 API Token Access Key ID
// R2_SECRET_ACCESS_KEY: R2 API Token Secret Access Key
// R2_BUCKET_NAME: Target Bucket Name

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a file to Cloudflare R2
 * @param {string} filePath - Path to the local file
 * @param {string} destinationKey - The key (path) in the bucket
 */
async function uploadToR2(filePath, destinationKey) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileStream = fs.createReadStream(filePath);
    const fileStats = fs.statSync(filePath);

    const uploadParams = {
      Bucket: process.env.R2_BUCKET_NAME,
      Key: destinationKey,
      Body: fileStream,
      ContentLength: fileStats.size,
      // Optional: Set Content-Type based on extension
      ContentType: getContentType(filePath),
    };

    console.log(`Starting upload: ${filePath} -> ${destinationKey}`);
    
    const command = new PutObjectCommand(uploadParams);
    const response = await r2Client.send(command);
    
    console.log("Upload successful!");
    console.log("Response Metadata:", response.$metadata);
    return response;

  } catch (err) {
    console.error("Error uploading to R2:", err);
    process.exit(1);
  }
}

/**
 * Basic helper to determine content type
 */
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeMap = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".json": "application/json",
  };
  return mimeMap[ext] || "application/octet-stream";
}

// Example usage:
// uploadToR2("./my-image.png", "uploads/images/my-image.png");

module.exports = { uploadToR2 };
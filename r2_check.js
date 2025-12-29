const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
require("dotenv").config();

async function checkConnection() {
  console.log("--- R2 Connection Check ---");
  console.log(`Bucket: ${process.env.R2_BUCKET_NAME}`);
  console.log(`Endpoint: ${process.env.R2_ENDPOINT}`);
  
  const s3Client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  try {
    // バケットの中身をリストアップできるか試す（権限チェック）
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      MaxKeys: 1,
    });
    await s3Client.send(command);
    console.log("✅ 接続成功: 認証情報とバケット名は正しいです。");
    console.log("もしアップロードだけ失敗する場合は、トークンの権限が『読み取り専用』になっていないか確認してください。");
  } catch (err) {
    console.error("❌ 接続失敗:");
    if (err.name === "AccessDenied") {
      console.error("エラー内容: Access Denied (403)");
      console.error("原因: トークンの権限が不足しているか、アクセスキーが間違っています。");
    } else if (err.name === "NoSuchBucket") {
      console.error("エラー内容: No Such Bucket (404)");
      console.error("原因: バケット名が間違っています。");
    } else {
      console.error(err);
    }
  }
}

checkConnection();
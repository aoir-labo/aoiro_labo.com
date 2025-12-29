import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

// .envを読み込み
dotenv.config();

async function checkConnection() {
  console.log("--- R2 Connection Check (ESM Mode) ---");
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
    // バケットの中身を1件だけ取得して接続テスト
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      MaxKeys: 1,
    });
    
    await s3Client.send(command);
    console.log("\x1b[32m%s\x1b[0m", "[OK] 接続成功: 認証情報とバケット名は正しいです。");
    console.log("アップロードでエラーが出る場合は、トークン作成時の権限を「編集（Read & Write）」に設定し直してください。");
  } catch (err) {
    console.log("\x1b[31m%s\x1b[0m", "[NG] 接続失敗:");
    if (err.name === "AccessDenied") {
      console.error("エラー内容: Access Denied (403)");
      console.error("【対策】CloudflareでAPIトークンを再作成し、「オブジェクトの読み取りと書き込み」権限を与えてください。");
    } else if (err.name === "NoSuchBucket") {
      console.error("エラー内容: No Such Bucket (404)");
      console.error("【対策】.env の R2_BUCKET_NAME が管理画面の名称と一致するか確認してください。");
    } else {
      console.error(err.message);
    }
  }
}

checkConnection();
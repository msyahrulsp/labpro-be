import { google } from "googleapis";

const fs = require('fs');

export const uploadToGoogleDrive = async (file: any, username: string) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${__dirname}/drive-service-key.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  const fileMetadata = {
    name: `KTP - ${username} - ${Date().toString().split(' GMT')[0]}`,
    parents: ["1bmhbxLm_b8xB1zYVskmSGHuXSn3sOqJ1"],
  };
  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };
  const driveService = google.drive({ version: "v3", auth });
  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  fs.unlinkSync(file.path);
  return response;
}
const multer = require('multer');
const path = require('path');
const validExt: string[] = ['.jpg', '.jpeg', '.png'];
const maxSize = 5 * 1024 * 1024;

const fileFilter = (req: any, file: any, cb: any) => {
  const fileSize = parseInt(req.headers["content-length"]);
  if (validExt.indexOf(path.extname(file.originalname)) === -1) {
    return cb(null, false);
  }
  if (fileSize >= maxSize) return cb(null, false);
  cb(null, true);
}
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, './public/images');
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, req.body.username + path.extname(file.originalname));
  }
})

export const upload = multer({ storage: storage, fileFilter: fileFilter });
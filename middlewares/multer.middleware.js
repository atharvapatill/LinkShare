import fs from "fs";
import path from "path";
import multer from "multer";
import crypto from "crypto";

const uploadDir = path.resolve("uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir,{ recursive: true });
}

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,uploadDir)
    },
    filename: (req,file,cb)=>{
        const uniqueName =  `${Date.now()}-${crypto.randomUUID()}${path.extname(file.originalname)}`;
        cb(null,uniqueName);
    }
});

const upload = multer({
    storage,
    limits:{fileSize: 100 * 1024 * 1024} //100MB
});


const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.render("home", {
        error: "File too large",
      });
    }

    return res.render("home", {
      error: `Upload error: ${err.code}`,
    });
  }

  next(err);
};

export {upload,multerErrorHandler}




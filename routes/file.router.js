import { Router } from "express";
import { uploadFile,shareFile,downloadFile } from "../controllers/file.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const fileRouter = Router();

fileRouter.post("/upload",upload.single("myfile"),uploadFile);
fileRouter.post("/share/",shareFile);
fileRouter.get("/download/:fileid",downloadFile);

export {fileRouter};
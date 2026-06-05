import multer from "multer";

export const multerErrorHandler = (err, req, res, next) => {
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
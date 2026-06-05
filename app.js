import express from "express";
import dotenv from "dotenv";
import "./jobs/cleanupFiles.job.js";
import { connectDB } from "./config/db.config.js";


import { fileRouter } from "./routes/file.router.js";
import { multerErrorHandler } from "./middlewares/multer.middleware.js";
import { homeEJS,shareEJS,downloadEJS } from "./controllers/view.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs")

app.use("/api",fileRouter);


app.get("/",homeEJS);
app.get("/download/:fileid",downloadEJS);
app.get("/share/:fileid",shareEJS);

app.use(multerErrorHandler);

app.use((req, res) => {
  res.status(404).render("404");
});

connectDB()
.then(()=>{
    app.listen(port,()=>{
    console.log(`server is running`);
})
})
.catch((err)=>{
    console.log("Error while connecting to database");
})
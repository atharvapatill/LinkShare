import cron from "node-cron";
import fs from "fs/promises";
import { Files } from "../models/files.models.js";

// runs every hour
cron.schedule("0 * * * *", async () => {
  try {

    const now = new Date();

    const expiredFiles = await Files.find({
      expiresAt: { $lt: now }
    });

    for (const file of expiredFiles) {
      try {
        await fs.unlink(file.path);
        console.log("Deleted file from server:", file.path);

        await Files.deleteOne({ _id: file._id });
        console.log("Deleted from DB:", file._id);

      } catch (err) {
        console.error("Failed to delete:", file.path, err.message);
      }
    }

    console.log(`Cleanup done: ${expiredFiles.length} files removed`);

  } catch (err) {
    console.error("Cron error:", err);
  }
});
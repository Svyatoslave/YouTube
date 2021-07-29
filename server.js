import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import * as fs from "fs";

import { STATIC, PORT, DB_URL } from "./constants.js";
import router from "./router.js";

const app = express();

app.use(express.json());
app.use(express.static(STATIC));
app.use(fileUpload({}));
app.use("/api", router);

async function startApp() {
  try {
    if (!fs.existsSync(STATIC)) {
      fs.mkdirSync(STATIC);
    }
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();

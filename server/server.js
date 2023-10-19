import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";  
const __dirname = dirname(fileURLToPath(import.meta.url));
import api from "./api.js"; // Assuming 'api.js' has been converted to ES Modules
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(join(__dirname, "../client/dist")));
app.use(api);

app.get("/", function (req, res) {
  res.send("Failed to compile vue build");
});

app.listen(PORT, ()=>{
  console.log("Server is running at port: " + PORT);
});

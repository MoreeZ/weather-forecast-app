import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";  
import api from "./api.js";
import dotenv from 'dotenv';

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

// PORT can be set in a .env file in root directory (default: 3000)
const PORT = process.env.PORT || 3000;
const app = express(); // create express app

// Use the static bundle generate by Vite
app.use(express.static(join(__dirname, "../client/dist")));
// merge the imported api express app into the server app.
app.use(api);

// If no Vite bundle is found then respond with the following text
app.get("/", function (req, res) {
  res.send("Failed to compile vue build");
});

// start the server at port PORT (default: 3000)
app.listen(PORT, ()=>{
  console.log("Server is running at port: " + PORT);
});

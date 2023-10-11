import { createServer } from "http";
import express from "express";
import compression from "compression";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bodyParser from "body-parser";
import api from "./api.js"; // Assuming 'api.js' has been converted to ES Modules
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, "../client/dist")));
app.use(api);

app.get("/", function (req, res) {
  res.sendFile(join(__dirname, "index.html"));
});

var server = createServer(app);
server.listen(port);
console.log("Server is running at port: " + port);

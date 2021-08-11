import express from "express";
import multer from "multer";
import apiproductos from "./routes/apiproductos";

const app = express();
const port = 8080;
const server = app.listen(port, () => console.log("Server Up at port", port));

server.on("error", (err) => {
  console.log("Server Error", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use("/api/productos", apiproductos);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

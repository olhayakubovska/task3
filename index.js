import http from "http";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import {
  addNote,
  getNotes,
  removeItem,
  updateItem,
} from "./node.controller.js";
import express from "express";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url); // Абсолютный путь к текущему файлу

const __dirname = path.dirname(__filename); // Абсолютный путь к директории текущего файла
// console.log(import.meta.url);
// console.log(__filename);
// console.log(__dirname);
const basePath = path.join(__dirname, "pages");
// console.log(basePath);

// const server = http.createServer(async (req, res) => {
//   if (req.method === "GET") {
//     const content = await fs.readFile(path.join(basePath, "index.html"));
//     res.setHeader("Content-Type", "text/html");
//     res.writeHead(200);
//     res.end(content);
//   } else if (req.method === "POST") {
//     const body = [];

//     res.writeHead(200, {
//       "Content-Type": "text/plain; charset=utf-8",
//     });

//     req.on("data", (data) => {
//       body.push(Buffer.from(data));
//     });

//     req.on("end", () => {
//       const title = body.toString().split("=")[1].replaceAll("+", " ");
//       console.log(title);
//       // console.log(body.toString().split("=")[1].replaceAll("+", " "));
//       addNote(title);
//       res.end(`title=${title}`);
//     });
//   }
// });

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "pages"));

app.use(express.static(path.resolve(__dirname, "public")));

// app.get("/", (req, res) => {
//   // res.sendFile(path.join(basePath, "index.html"));
//   res.render("index", {
//     title:'express app'
//   });
// });

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Home ",
    notes: await getNotes(),
    flag: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "app",
    notes: await getNotes(),
    flag: true,
  });
});

app.delete("/:id", async (req, res) => {
  // console.log("id",req.params.id)
  await removeItem(req.params.id);
  res.render("index", {
    title: "app",
    notes: await getNotes(),
    flag: false,
  });
});

app.put("/:id", async (req, res) => {
 const newNotes = await updateItem(req.params.id, req.body.title);

  res.render("index", {
    title: "updated app",
    notes: newNotes,
    flag: true,
  });
});

app.listen(port, () => {
  console.log(chalk.green("server has been started..."));
});

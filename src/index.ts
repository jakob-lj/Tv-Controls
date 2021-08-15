import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/device/:deviceid/turnoff", (req, res) => {
  res.send("ok");
});

app.listen(8000, () => {
  console.log("Listeing at 8000");
});

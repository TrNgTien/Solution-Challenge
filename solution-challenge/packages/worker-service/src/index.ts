import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("RESTFULL API is called successfully!");
});

app.listen(port, () => {
  console.log(`Server is started at http://localhost:${port}`);
});

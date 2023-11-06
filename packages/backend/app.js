const express = require("express");

const app = express();
const port = process.env.PORT || "8080";

// Encoding middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.end();
});

app.get("/api/unlock", (req, res) => {
  res.send("Hello World!");
});

// Unhandled routes generate 404
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error middleware
app.use((err, req, res, next) => {
  console.error(req.method, req.url, err.status, err.message);
  res.status(err.status || 500);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

import express from "express";
import { unlock } from "./unlock.js";

const app = express();
const port = process.env.PORT || "8080";

// Encoding middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.head("/", (req, res) => {
  res.send();
});

app.get("/", (req, res) => {
  res.send();
});

app.head("/api/unlock", (req, res) => {
  res.send();
});

app.post("/api/unlock", async (req, res) => {
  try {
    const result = await unlock.handle(req.body);
    res.send(result);
  } catch (err) {
    console.error(req.url, "error:", err.message);
    // Only send 404, no 500
    res.status(404).send({
      code: 404,
      content: "Not found",
    });
  }
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
  next();
});

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${server.address().port}/`);
});

function handleSignal(signal) {
  console.log(`Received ${signal}`);
  process.exit(0);
}

process.on("SIGINT", handleSignal);
["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, handleSignal);
});

import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.get("/api/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send();
  try {
    var decoded = jwt.verify(token, "shhhhh");
    return res.json("受保护的资源！！");
  } catch (err) {
    return res.status(401).send();
  }
});

app.get("/api/login", (req, res) => {
  const token = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "3s" });
  const refreshToken = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "7d" });

  res.json({
    token,
    refreshToken,
  });
});

app.get("/api/refreshToken", (req, res) => {
  const token = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "3s" });

  res.json({
    token,
  });
});

app.listen(9980, () => {
  console.log("Server is running on http://localhost:9980");
});

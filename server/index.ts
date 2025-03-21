import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.get("/api/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send();
  try {
    jwt.verify(token, "shhhhh");
    return res.json("受保护的资源！！");
  } catch (err) {
    return res.status(401).send(err);
  }
});

app.get("/api/protected2", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send();
  try {
    jwt.verify(token, "shhhhh");
    return res.json("另一个受保护的资源！！");
  } catch (err) {
    return res.status(401).send(err);
  }
});

app.get("/api/login", (req, res) => {
  const token = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "30s" });
  const refreshToken = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "7d" });

  res.json({
    token,
    refreshToken,
  });
});

app.get("/api/refreshToken", (req, res) => {
  const token = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "30s" });

  setTimeout(() => {
    res.json({
      token,
    });
  }, 3000);
});

app.listen(9980, () => {
  console.log("Server is running on http://localhost:9980");
});

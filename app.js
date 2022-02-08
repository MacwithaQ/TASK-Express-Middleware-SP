const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const productsRoutes = require("./api/products/routes");

const app = express();
connectDb();

app.use(cors());
app.use(express.json());
// MIDDLEWARES
app.use((req, res, next) => {
  console.log(
    req.method,
    req.protocol + "://" + req.hostname + ":" + process.env.PORT + req.path
  );
  next();
});
// Routes
app.use("/api/products", productsRoutes);

//ERROR HANDLING
app.use((err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

//PATH NOT FOUND
app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found" });
});

app.listen(process.env.PORT);

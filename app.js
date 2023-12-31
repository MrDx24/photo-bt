const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const uploadRoutes = require('./api/routes/uploadRoutes');

mongoose.connect("mongodb+srv://admin:root@invoicebilling.4hhue.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
// "mongodb+srv://root:root@cluster0-4hhue.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "*"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "*");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/upload",  uploadRoutes);

app.use("/",  (req, res, next) => {
  res.status(200).json("Welcome!!!");
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

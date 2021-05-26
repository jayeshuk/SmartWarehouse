const express = require("express");
const morgan = require("morgan");
const app = express();
var cors = require("cors");

const userRouter = require("./routes/userRoutes");
const warehouseRouter = require("./routes/warehouseRoutes");
const produceRouter = require("./routes/produceRoutes");
const verifyRouter = require("./routes/verifyRoutes");
const AppError = require("../utils/appError");
const globalErrorHandler = require("./controllers/errorController");

var whitelist = [""];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Hello From 2nd Middleware!');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES

app.use("/api/v1/users", userRouter);
app.use("/api/v1/warehouses", warehouseRouter);
app.use("/api/v1/produces", produceRouter);
app.use("/api/v1/verifies", verifyRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const { db, query } = require("./database");
const {
  authRoutes,
  productRoutes,
  categoryRoutes,
  userRoutes,
  rajaongkirRoutes,
  opencageRoutes,
  addressRoutes,
  transactionRoutes,
  paymentRoutes,
  adminRoutes,
  stockRoutes,
} = require("./routes");
const { runSeed } = require("./helpers/runSeed");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("src/public"));

//#region API ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/rajaOngkir", rajaongkirRoutes);
app.use("/api/opencage", opencageRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/stock", stockRoutes);

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
    runSeed();
  }
});

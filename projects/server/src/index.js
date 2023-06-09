require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const { db, query } = require("../database");
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
  userRoutes,
  adminRoutes,
} = require("../routes");
const { runSeed } = require("../helpers/runSeed");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

//#region API ROUTES

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);
app.use("/user", userRoutes);
app.use("/rajaOngkir", rajaongkirRoutes);
app.use("/opencage", opencageRoutes);
app.use("/address", addressRoutes);
app.use("/transactions", transactionRoutes);
app.use("/payments", paymentRoutes);
app.use("/user", userRoutes);

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
// app.use((req, res, next) => {
//   if (req.path.includes("/api/")) {
//     res.status(404).send("Not found !");
//   } else {
//     next();
//   }
// });

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

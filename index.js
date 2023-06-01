const express = require("express");
const PORT = 8001;
const app = express();
const { db, query } = require("./database");
const cors = require("cors");
const { body, validationResult } = require("express-validator");

const {
  authRoutes,
  productRoutes,
  categoryRoutes,
  transactionRoutes,
} = require("./routes");

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.post(
  "/validation",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ error: errors.array });
      return res.status(200).json({ error: errors.array });
    }
  }
);

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/transaction", transactionRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});

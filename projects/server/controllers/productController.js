const { db, query } = require("../database");

module.exports = {
  addProduct: async (req, res) => {
    const {
      productName,
      productPrice,
      productStock,
      productDesc,
      id_category,
    } = req.body;

    const id_admin = req.user.id;

    const { file } = req;
    const filepath = file ? "/" + file.filename : null;

    if (!file) {
      return res.status(400).send({ message: "Please upload a file." });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      return res
        .status(400)
        .send({ message: "Please choose a JPEG or PNG file." });
    }

    if (file.size > 1024 * 1024) {
      return res
        .status(400)
        .send({ message: "File size should not exceed 1MB." });
    }

    let addProductQuery = `INSERT INTO products VALUES (null, ${db.escape(
      productName
    )}, ${db.escape(productPrice)}, ${db.escape(productStock)}, ${db.escape(
      filepath
    )}, ${db.escape(productDesc)}, ${db.escape(
      id_category
    )},null,null,${db.escape(id_admin)})`;
    let addProductResult = await query(addProductQuery);

    return res.status(200).send({
      data: addProductResult,
      message: "product created!",
      filepath,
      success: true,
    });
  },

  fetchAllProducts: async (req, res) => {
    try {
      const products = await query(`SELECT * FROM products`);
      const { category } = req.query;

      if (category) {
        const filteredProducts = products.filter(
          (product) => product.category === category
        );
        res.status(200).send(filteredProducts);
      } else {
        res.status(200).send(products);
      }
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchProductsByCategory: async (req, res) => {
    try {
      const idParams = parseInt(req.query.id);

      const product = await query(
        `SELECT * FROM product WHERE id_category = ${db.escape(idParams)}`
      );
      return res.status(200).send(product);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  fetchProduct: async (req, res) => {
    try {
      const idParams = parseInt(req.params.id);

      const product = await query(
        `SELECT * FROM products WHERE id_product = ${db.escape(idParams)}`
      );

      if (product.length === 0) {
        return res.status(404).send("Product not found");
      }

      return res.status(200).send(product[0]);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};

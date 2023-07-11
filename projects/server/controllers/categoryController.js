const { db, query } = require("../database");
const jwt = require("jsonwebtoken");

module.exports = {
  addCategory: async (req, res) => {
    const { categoryName } = req.body;

    let getCategoryQuery = `SELECT * FROM categories WHERE category_name = ${db.escape(
      categoryName
    )}`;
    let categoryExist = await query(getCategoryQuery);

    if (categoryExist.length > 0) {
      return res.status(400).send("category is already exist!");
    }
    let addCategoryQuery = `INSERT INTO categories VALUES (null, ${db.escape(
      categoryName
    )})`;
    let addCategoryResult = await query(addCategoryQuery);

    return res
      .status(200)
      .send({ data: addCategoryResult, message: "category created!" });
  },
  fetchAllCategories: async (req, res) => {
    try {
      const category = await query(`SELECT * FROM categories`);
      return res.status(200).send(category);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};

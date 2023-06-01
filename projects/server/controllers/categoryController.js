const { db, query } = require("../database");
const jwt = require("jsonwebtoken");

module.exports = {
  addCategory: async (req, res) => {
    const { categoryName } = req.body;

    const idUsers = req.user.id;

    let addCategoryQuery = `INSERT INTO category VALUES (null, ${db.escape(
      categoryName
    )}, ${db.escape(idUsers)})`;
    let addCategoryResult = await query(addCategoryQuery);

    return res
      .status(200)
      .send({ data: addCategoryResult, message: "category created!" });
  },
  fetchAllCategories: async (req, res) => {
    try {
      const category = await query(`SELECT * FROM category limit 0,6`);
      return res.status(200).send(category);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};

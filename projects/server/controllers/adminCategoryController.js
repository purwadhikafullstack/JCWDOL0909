const { db, query } = require("../database");

const adminCategoryController = {
  fetchAllCategories: async (req, res) => {
    try {
      const categories = await query(`SELECT * FROM categories`);
      return res.status(200).send(categories);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  addCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      const idAdmin = req.user.id;
      const admin = await query(
        `SELECT * FROM admins WHERE id_admin = ${db.escape(idAdmin)}`
      );
      if (admin.length === 0) {
        return res.status(404).send("Admin not found");
      }
      const getCategoryQuery = `SELECT * FROM categories WHERE category_name = ${db.escape(
        categoryName
      )}`;
      const categoryExist = await query(getCategoryQuery);
      if (categoryExist.length > 0) {
        return res.status(400).send("Category is already exist!");
      }
      const addCategoryQuery = `INSERT INTO categories VALUES (null, ${db.escape(
        categoryName
      )})`;
      const addCategoryResult = await query(addCategoryQuery);
      return res
        .status(200)
        .send({ data: addCategoryResult, message: "Category Added!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message || "Internal Server Error");
    }
  },

  editCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      const idCategory = req.params.id;
      const category = await query(
        `SELECT * FROM categories WHERE id_category = ${db.escape(idCategory)}`
      );
      if (category.length === 0) {
        return res.status(404).send("Category not found");
      }
      const getCategoryQuery = `SELECT * FROM categories WHERE category_name = ${db.escape(
        categoryName
      )}`;
      const categoryExist = await query(getCategoryQuery);
      if (categoryExist.length > 0) {
        return res.status(400).send("Category already exists!");
      }
      const updateCategoryQuery = `UPDATE categories SET
        category_name = ${db.escape(categoryName)}
        WHERE id_category = ${db.escape(idCategory)}`;
      await query(updateCategoryQuery);
      const updatedCategory = await query(
        `SELECT * FROM categories WHERE id_category = ${db.escape(idCategory)}`
      );
      res.status(200).send(updatedCategory);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message || "Internal Server Error");
    }
  },

  fetchCategoryById: async (req, res) => {
    try {
      const idCategory = req.params.id;
      const category = await query(
        `SELECT * FROM categories WHERE id_category = ${db.escape(idCategory)}`
      );
      return res.status(200).send(category);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const idCategory = req.params.id;
      await query(
        `DELETE FROM categories WHERE id_category = ${db.escape(idCategory)}`
      );
      return res.status(200).send("Category Deleted Successfully.");
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};

module.exports = adminCategoryController;

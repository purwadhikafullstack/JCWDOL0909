const { db, query } = require("../database");

module.exports = {
  fetchStockHistories: async (req, res) => {
    try {
      const adminName = req.user.name;
      const stockHistories = await query(
        `SELECT stock_histories.*, products.*
         FROM stock_histories
         INNER JOIN products ON stock_histories.id_product = products.id_product
         WHERE stock_histories.store = ${db.escape(adminName)}`
      );
      return res.status(200).send(stockHistories);
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).send(error);
    }
  },
};

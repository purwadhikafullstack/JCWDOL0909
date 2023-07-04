const { db, query } = require("../database");

module.exports = {
  fetchTransaction: async (req, res) => {
    try {
      const idUser = req.user.id;

      const transaction = await query(`
        SELECT *
        FROM transactions
        INNER JOIN shippings ON transactions.id_shipping = shippings.id_shipping
        INNER JOIN transaction_products ON transactions.id_transaction = transaction_products.id_transaction
        INNER JOIN products ON transaction_products.id_product = products.id_product
        WHERE transactions.id_user = ${db.escape(
          idUser
        )} AND transaction_products.id_transaction IN (
          SELECT id_transaction
          FROM transactions
        )
      `);

      res.status(200).send(transaction);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};

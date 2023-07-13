const { db, query } = require("../database");

module.exports = {
  fetchTransaction: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { startDate, endDate } = req.query;

      let queryStr = `
        SELECT *
        FROM transactions
        INNER JOIN shippings ON transactions.id_shipping = shippings.id_shipping
        INNER JOIN transaction_products ON transactions.id_transaction = transaction_products.id_transaction
        INNER JOIN products ON transaction_products.id_product = products.id_product
        INNER JOIN transactions_status ON transactions.id_transaction_status = transactions_status.id_transaction_status
        WHERE transactions.id_user = ${db.escape(idUser)}
      `;

      // Check if startDate and endDate are provided
      if (startDate && endDate) {
        queryStr += ` AND transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }

      const transaction = await query(queryStr);

      res.status(200).send(transaction);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  fetchTransactionStatus: async (req, res) => {
    try {
      const transactionStatus = await query(
        `SELECT * FROM transactions_status`
      );
      return res.status(200).send(transactionStatus);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  fetchTransactions: async (req, res) => {
    try {
      const { startDate, endDate, page = 1, pageSize = 5, status } = req.query;
      const offset = (page - 1) * pageSize;
      const limitStr = ` LIMIT ${offset}, ${pageSize}`;
      // Check if startDate and endDate are provided
      let queryWhereHead = "";
      if (startDate && endDate) {
        queryWhereHead += ` where transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }

      // Apply status filter
      if (status) {
        queryWhereHead += ` ${
          queryWhereHead ? "AND" : "where"
        } transactions.id_transaction_status = ${db.escape(status)}`;
      }
      let queryStr = `
      SELECT * FROM (SELECT * from transactions ${queryWhereHead} ${limitStr}) as transactions 
          INNER JOIN shippings ON transactions.id_shipping = shippings.id_shipping
          INNER JOIN transaction_products ON transactions.id_transaction = transaction_products.id_transaction
          INNER JOIN products ON transaction_products.id_product = products.id_product
          INNER JOIN transactions_status ON transactions.id_transaction_status = transactions_status.id_transaction_status
          INNER JOIN users ON transactions.id_user = users.id_user
          `;

      // Add pagination
      console.log(queryStr);
      const transactions = await query(queryStr);
      let totalWhereCountQuery = "";
      if (startDate && endDate) {
        totalWhereCountQuery += ` where transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }
      if (status) {
        totalWhereCountQuery += `${
          totalWhereCountQuery ? "AND" : "where"
        } transactions.id_transaction_status = ${db.escape(status)}`;
      }

      // Get total count for pagination
      let totalCountQuery = `
          SELECT COUNT(*) AS totalCount from
          (select * FROM transactions ${totalWhereCountQuery} ) as transactions
        `;
      console.log(totalCountQuery);
      const totalCountResult = await query(totalCountQuery);
      const totalCount = totalCountResult[0].totalCount;

      res.status(200).send({ transactions, totalCount });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  createTransaction: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { productData, invoice_number, date, id_shipping, total_price } =
        req.body;

      // Insert transaction into transactions table
      const createTransaction = `INSERT INTO transactions VALUES (null, ${db.escape(
        idUser
      )}, ${db.escape(total_price)}, ${db.escape(
        id_shipping
      )}, null, ${db.escape(date)}, ${db.escape(invoice_number)}, 1, null)`;

      const createTransactionResult = await query(createTransaction);
      const id_transaction = createTransactionResult.insertId;

      // Insert transaction products into transaction_products table
      const insertTransactionProducts = productData.map(
        (product) =>
          `INSERT INTO transaction_products
           VALUES (null, ${db.escape(id_transaction)}, ${db.escape(
            product.id_product
          )}, ${db.escape(product.quantity)})`
      );

      for (const queryStr of insertTransactionProducts) {
        await query(queryStr);
      }

      // Update product stock
      const updateProductStocks = productData.map(
        (product) =>
          `UPDATE products SET stock = stock - ${db.escape(
            product.quantity
          )} WHERE id_product = ${db.escape(product.id_product)}`
      );

      for (const queryStr of updateProductStocks) {
        await query(queryStr);
      }

      return res.status(200).send("Transaction created successfully");
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).send(error);
    }
  },
  fetchTransactionShipping: async (req, res) => {
    try {
      const shippingData = await query(`SELECT * FROM shippings`);
      return res.status(200).send(shippingData);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};

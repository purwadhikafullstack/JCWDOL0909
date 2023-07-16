const { db, query } = require("../database");
const moment = require("moment");

module.exports = {
  fetchTransaction: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { startDate, endDate, page = 1, pageSize = 5, status } = req.query;
      const offset = (page - 1) * pageSize;
      const limitStr = ` LIMIT ${offset}, ${pageSize}`;
      let queryWhereHead = "";
      if (startDate && endDate) {
        queryWhereHead += ` where transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }
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
          WHERE transactions.id_user = ${db.escape(idUser)}
          `;

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
      let totalCountQuery = `SELECT COUNT(*) AS totalCount FROM transactions ${
        totalWhereCountQuery ? ` ${totalWhereCountQuery} AND` : "WHERE"
      } id_user = ${db.escape(idUser)}`;
      const totalCountResult = await query(totalCountQuery);
      const totalCount = totalCountResult[0].totalCount;

      res.status(200).send({ transactions, totalCount });
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

  cancelTransaction: async (req, res) => {
    try {
      const idTransaction = parseInt(req.params.id);
      await query(
        `UPDATE transactions
        SET id_transaction_status = 6
        WHERE id_transaction = ${db.escape(idTransaction)};`
      );
      return res.status(200).send("Transaction has been canceled.");
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  confirmTransaction: async (req, res) => {
    try {
      const idTransaction = parseInt(req.params.id);
      await query(
        `UPDATE transactions
        SET id_transaction_status = 5
        WHERE id_transaction = ${db.escape(idTransaction)};`
      );
      return res.status(200).send("Transaction has been confirmed.");
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  fetchTransactions: async (req, res) => {
    try {
      const { startDate, endDate, page = 1, pageSize = 5, status } = req.query;
      const offset = (page - 1) * pageSize;
      const limitStr = ` LIMIT ${offset}, ${pageSize}`;
      let queryWhereHead = "";
      if (startDate && endDate) {
        queryWhereHead += ` where transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }
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
      let totalCountQuery = `
          SELECT COUNT(*) AS totalCount from
          (select * FROM transactions ${totalWhereCountQuery} ) as transactions
        `;
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
      const createTransaction = `INSERT INTO transactions VALUES (null, ${db.escape(
        idUser
      )}, ${db.escape(total_price)}, ${db.escape(
        id_shipping
      )}, null, ${db.escape(date)}, ${db.escape(invoice_number)}, 1, null)`;
      const createTransactionResult = await query(createTransaction);
      const id_transaction = createTransactionResult.insertId;
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
      const updateProductStocks = productData.map(
        (product) =>
          `UPDATE products SET stock = stock - ${db.escape(
            product.quantity
          )} WHERE id_product = ${db.escape(product.id_product)}`
      );
      for (const queryStr of updateProductStocks) {
        await query(queryStr);
      }
      const stockHistoryQueries = productData.map(async (product) => {
        const adminQuery = `
          SELECT admins.id_branch, admins.name, products.stock
          FROM products
          INNER JOIN admins ON products.id_branch = admins.id_branch
          WHERE products.id_product = ${db.escape(product.id_product)}
        `;
        const adminResult = await query(adminQuery);
        const adminName = adminResult[0].name;
        const productStock = adminResult[0].stock;

        const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

        const stockHistoryQuery = `
          INSERT INTO stock_histories
          VALUES (
            null,
            ${db.escape(currentDate)},
            ${db.escape(adminName)},
            'sale',
            '-',
            ${db.escape(product.quantity)},
            ${db.escape(productStock)},
            ${db.escape(product.id_product)}
          )
        `;
        await query(stockHistoryQuery);
      });
      await Promise.all(stockHistoryQueries);

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

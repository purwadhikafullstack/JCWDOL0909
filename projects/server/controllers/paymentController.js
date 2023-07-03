const { db, query } = require("../database");

module.exports = {
  uploadPayment: async (req, res) => {
    try {
      const { file } = req;
      const idTransaction = req.query.id_transaction;
      const filepath = file ? "/" + file.filename : null;

      await query(
        `UPDATE payments SET proof_of_payment = ${db.escape(
          filepath
        )} WHERE id_transaction = ${db.escape(idTransaction)}`
      );

      res
        .status(200)
        .send({ filepath, message: "Payment proof uploaded successfully." });
    } catch (error) {
      console.log(error);
    }
  },
};

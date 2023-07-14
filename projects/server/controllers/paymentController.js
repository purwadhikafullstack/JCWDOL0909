const { db, query } = require("../database");

module.exports = {
  addPayment: async (req, res) => {
    try {
      const { file } = req;
      const idTransaction = req.query.id_transaction;
      const filepath = file ? "/" + file.filename : null;

      if (!file) {
        return res.status(400).send({ message: "Please upload a file." });
      }
      if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        return res
          .status(400)
          .send({ message: "Please choose a JPEG or PNG file." });
      }

      const addPaymentResult = await query(
        `INSERT INTO payments VALUES (null, ${db.escape(filepath)}, ${db.escape(
          idTransaction
        )})`
      );

      const paymentId = addPaymentResult.insertId;

      await query(
        `UPDATE transactions SET id_payment = ${db.escape(
          paymentId
        )}, id_transaction_status = 2 WHERE id_transaction = ${db.escape(
          idTransaction
        )}`
      );

      res.status(200).send({
        addPaymentResult,
        message: "Payment proof uploaded successfully.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

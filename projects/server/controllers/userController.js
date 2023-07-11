const { db, query } = require("../database");
const moment = require("moment");

module.exports = {
  editProfile: async (req, res) => {
    try {
      const { email, name, phone_number, gender, birthday } = req.body;
      const idUser = req.user.id;
      const user = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idUser)}`
      );
      console.log(idUser);
      if (user.length <= 0) {
        return res.status(404).send("User not found");
      }

      const formattedBirthday = moment(birthday, "YYYY-MM-DD").format(
        "YYYY-MM-DD"
      );

      const updateQuery = `
        UPDATE users SET
          email = COALESCE(${db.escape(email)}, email),
          name = COALESCE(${db.escape(name)}, name),
          phoneNumber = COALESCE(${db.escape(phoneNumber)}, phoneNumber),
          gender = COALESCE(${db.escape(gender)}, gender),
          birthday = COALESCE(STR_TO_DATE(${db.escape(
            formattedBirthday
          )}, '%Y-%m-%d'), birthday)
        WHERE id_user = ${db.escape(idUser)}
      `;
      await query(updateQuery);

      const updatedUser = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idUser)}`
      );

      return res.status(200).send(updatedUser);
    } catch (error) {
      console.error(error); // Tambahkan ini untuk melihat kesalahan pada server
      res.status(500).send(error.message || "Internal Server Error");
    }
  },
  uploadProfilePic: async (req, res) => {
    try {
      const { file } = req;
      const filepath = file ? "/" + file.filename : null;

      await query(
        `UPDATE users SET profilePicture = ${db.escape(
          filepath
        )} WHERE id_user = ${db.escape(req.user.id)}`
      );

      res
        .status(200)
        .send({ filepath, message: "Profile picture uploaded successfully." });
    } catch (error) {
      console.log(error);
    }
  },
};

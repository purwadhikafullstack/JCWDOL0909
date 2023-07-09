const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const nodemailer = require("../helpers/nodemailer");

exports.runSeed = async function () {
  console.log("run seed ...");
  const userSeeds = [
    {
      name: "annisafirlia",
      email: "annisafirlia1@gmail.com",
      id_role: "1",
    },
  ];

  for (const userSeed of userSeeds) {
    const getAdminquery = `SELECT * FROM admins WHERE email=${db.escape(
      userSeed.email
    )}`;
    let isAdminExist = await query(getAdminquery);

    if (isAdminExist.length <= 0) {
      // Generate random 10 characters for password
      const randomstring = Math.random().toString(36).slice(-10);
      const hashPass = await bcrypt.hash(randomstring, 10);

      console.log(randomstring);

      const addAdminQuery = `INSERT INTO admins VALUES (null, ${db.escape(
        userSeed.name
      )}, ${db.escape(userSeed.email)}, ${db.escape(hashPass)},${db.escape(
        userSeed.id_role
      )}, null)`;

      let addAdminResult = await query(addAdminQuery);

      let payload = { id: addUserResult.insertId };
      const token = jwt.sign(payload, "six6", { expiresIn: "5m" });
      console.log(token);

      console.log("create user:", addAdminResult);

      let mail = {
        from: `Admin <diywithicha@gmail.com>`,
        to: `${userSeed.email}`,
        subject: `super Admin created!`,
        html: `hi <b>${userSeed.name}</b>, <br />Your auto-generated password is: ${randomstring}. Use it to login to the e-grocery app.`,
      };
      nodemailer.sendMail(mail);
    }
  }
  console.log("seed finish!");
};

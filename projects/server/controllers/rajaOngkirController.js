const Axios = require("axios");

module.exports = {
  getProvince: async (req, res) => {
    try {
      const response = await Axios.get(
        "https://api.rajaongkir.com/starter/province",
        {
          headers: {
            key: "e4cec3d07804ee5fb5e9be38ae552a69",
          },
        }
      );

      res.json(response.data);
    } catch (error) {
      console.log("Error fetching provinces:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getCity: async (req, res) => {
    const provinceId = req.query.provinceId;

    if (!provinceId) {
      return res.status(400).json({ error: "Province ID is required" });
    }

    try {
      const response = await Axios.get(
        `https://api.rajaongkir.com/starter/city?province=${provinceId}`,
        {
          headers: {
            key: "e4cec3d07804ee5fb5e9be38ae552a69",
          },
        }
      );

      res.json(response.data);
    } catch (error) {
      console.log("Error fetching cities:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getDistrict: async (req, res) => {
    const cityId = req.query.cityId;

    if (!cityId) {
      return res.status(400).json({ error: "City ID is required" });
    }

    try {
      const response = await Axios.get(
        `https://api.rajaongkir.com/starter/subdistrict?city=${cityId}`,
        {
          headers: {
            key: "e4cec3d07804ee5fb5e9be38ae552a69",
          },
        }
      );

      res.json(response.data);
    } catch (error) {
      console.log("Error fetching districts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

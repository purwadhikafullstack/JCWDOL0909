const express = require("express");
const axios = require("axios");
const app = express();
const api_key = "daeea4a5ce8a4985acd17b66e72a7530";

module.exports = {
  fetchGeolocation: async (req, res) => {
    const { province, city } = req.params;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}, ${province}&key=${api_key}`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        if (data.total_results > 0) {
          const firstResult = data.results[0];
          const latitude = firstResult.geometry.lat;
          const longitude = firstResult.geometry.lng;
          const location = {
            province,
            city,
            latitude,
            longitude,
          };
          res.json(location);
        } else {
          res.status(404).json({ error: "unknown location!" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "an error occured!" });
      });
  },
};

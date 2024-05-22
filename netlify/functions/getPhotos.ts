const axios = require("axios");
const dotenv = require("dotenv").config();

exports.handler = async () => {
  try {
    let response = await axios.get(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=yellow+flowers&image_type=photo&safesearch=true&per_page=3`,
      {
        headers: { Accept: "application/json", "Accept-Encoding": "identity" },
        params: { trophies: true },
      }
    );

    let imageURL = response.data.hits;

    return {
      statusCode: 200,
      body: JSON.stringify({ imageURL }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};

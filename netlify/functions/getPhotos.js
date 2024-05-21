import axios from "axios";

exports.handler = async (event, context) => {
  try {
    const { keyword } = event.queryStringParameters;
    let response = await axios.get(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${keyword}&image_type=photo&safesearch=true&per_page=3`,
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

// https://pixabay.com/api/?key=44004584-d16e30b5f73a4337dbdf20d5c&q=yellow+flowers&image_type=photo

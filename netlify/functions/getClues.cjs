const dotenv = require("dotenv").config();
import OpenAI from "openai";

exports.handler = async (event) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const prompt = event.body;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125", // cause error
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: "Create a crossword clue for each object in the array of objects that the user provides. Do not include any text outside of the square brackets. The response should only include the prompted array with the clue property set to the clue you have generated. Retain commas.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
      temperature: 0.8,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const { content } = response.choices[0].message;

    console.log(typeof content); // this is a string, which makes sense since we haven't parsed the response from openai => we don't have to stringify to send it back to our app

    return {
      statusCode: 200,
      body: content,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: typeof error === "string" ? error : JSON.stringify({ error }),
    };
  }
};

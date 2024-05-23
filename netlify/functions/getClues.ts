const dotenv = require("dotenv").config();
import Anthropic from "@anthropic-ai/sdk";

exports.handler = async (event) => {
  // const anthropic = new Anthropic({
  //   apiKey: process.env.ANTHROPIC_API_KEY,
  // });

  try {
    const prompt = event.body;
    console.log(prompt);
    // const msg = await anthropic.messages.create({
    //   model: "claude-3-haiku-20240307",
    //   max_tokens: 4000,
    //   temperature: 0.8,
    //   system:
    //     "Create a crossword clue for each object in the array of objects that the user provides. Do not include any text outside of the square brackets. The response should only include the prompted array with the clue property set to the clue you have generated.",
    //   messages: [
    //     {
    //       role: "user",
    //       content: [
    //         {
    //           type: "text",
    //           text: prompt,
    //         },
    //       ],
    //     },
    //   ],
    // });

    return {
      statusCode: 200,
      body: JSON.stringify({ prompt }),
    };
  } catch (error) {
    // do something
  }
};

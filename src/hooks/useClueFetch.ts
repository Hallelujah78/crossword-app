// react
import { useState } from "react";

// models
import type Clue from "../classes/Clue";

const useClueFetch = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newClues, setNewClues] = useState<Clue[]>();

  async function getClues(clues: Clue[]) {
    type ReqClue = {
      id: string;
      word: string;
      clue: string;
    };
    setIsLoading(true);
    const requestArray: ReqClue[] = [];

    for (const clue of clues) {
      const reqClue = { id: clue.id, word: clue.answer.join(""), clue: "" };
      requestArray.push(reqClue);
    }

    const apiURL = "/.netlify/functions/getClues";

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: { accept: "application/json" },
        body: JSON.stringify(requestArray),
      });

      if (!response.ok && response.status === 500 && !response.bodyUsed) {
        throw new Error(
          `${response.status}: ${response.statusText}. This may indicate that the request took longer than 10 seconds and timed out. This is not uncommon with OpenAI API requests. Please try again!`
        );
      }

      const data = await response.json();

      if (response.ok) {
        for (const clue of clues) {
          const id = clue.id;
          const clueResp = data.find((clueObj: Clue) => {
            return clueObj?.id === id;
          });
          if (clueResp.clue && clueResp.clue !== "") {
            clue.clue = clueResp.clue;
          } else {
            throw new Error(
              "The clues received from the AI are not in the correct format. Try generating the clues again!"
            );
          }
        }

        setNewClues(clues);
      } else {
        // response is not okay, and we already know that there's a body and the status is not 500 => we can use the response's body to provide information to the user
        setError(data.error);
      }
    } catch (error: unknown) {
      setError(error as Error);
    }
    setIsLoading(false);
  }

  return { isLoading, error, getClues, newClues };
};

export default useClueFetch;

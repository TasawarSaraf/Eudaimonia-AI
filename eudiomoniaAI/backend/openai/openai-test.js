import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "You will be provided with a product description and seed words, and your task is to generate product names."
          },
          {
            "role": "user",
            "content": "Product description: A home milkshake maker\n    Seed words: fast, healthy, compact."
          }
        ],
        temperature: 0.8,
        max_tokens: 64,
        top_p: 1,
      });
      
  console.log(response.choices[0]);
}

main();
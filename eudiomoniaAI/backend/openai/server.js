import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Initialize OpenAI API
const openai = new OpenAI();

// Standardized configuration for OpenAI requests
const chatConfig = {
  model: "gpt-3.5-turbo",
  temperature: 0.8,
  maxTokens: 64,
  topP: 1,
};

// Route to handle requests for chat completions
// ROUTE 1 to test
app.post("/api/chat", async (req, res) => {
  try {
    const { systemMessage, userMessage } = req.body;

    // Make a request to OpenAI API to generate chat completion
    const response = await openai.chat.completions.create({
      model: chatConfig.model,
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: chatConfig.temperature,
      max_tokens: chatConfig.maxTokens,
      top_p: chatConfig.topP,
    });

    // Send the response back to the client
    res.json(response.choices[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to handle requests for chat completions
app.post("/api/chat", async (req, res) => {
  try {
    const { systemMessage, userMessage } = req.body;

    // Make a request to OpenAI API to generate chat completion
    const response = await openai.chat.completions.create({
      model: chatConfig.model,
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: chatConfig.temperature,
      max_tokens: chatConfig.maxTokens,
      top_p: chatConfig.topP,
    });

    // Send the response back to the client
    res.json(response.choices[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE 2, what's my next sleep
// Route to handle requests for chat completions
app.post("/api/chat/sleep", async (req, res) => {
  try {
    const { systemMessage, systemMessage1, systemMessage2 } = req.body;
    // Construct the content string for the system message
    const systemContent = `I slept ${systemMessage} amount of hours today. I woke up at ${systemMessage1} and 
    I went to bed yesterday at ${systemMessage2}`;

    // Make a request to OpenAI API to generate chat completion
    const response = await openai.chat.completions.create({
      model: chatConfig.model,
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        {
          role: "user",
          content: "How much should I sleep tonight? And when should I go to bed?",
        },
      ],
      temperature: chatConfig.temperature,
      max_tokens: chatConfig.maxTokens,
      top_p: chatConfig.topP,
    });

    // Send the response back to the client
    res.json(response.choices[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

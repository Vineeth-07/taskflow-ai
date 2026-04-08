const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const summarizeTask = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:  "You are a helpful assistant that converts task descriptions into short, clear action items.",
      },
      {
        role: "user",
        content:  `Convert this into a concise task title (max 8 words): ${text}`,
      },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = { summarizeTask };
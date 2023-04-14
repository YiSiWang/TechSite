const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI,
});
const openai = new OpenAIApi(configuration);

export const handler = async (event) => {
  const completion = await openai.createChatCompletion(JSON.parse(event.body));
  return {
    statusCode: 200,
    body: JSON.stringify(completion),
  };
};

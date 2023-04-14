import encryptedPrompt from './encryptedPrompt.json';

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI,
});
const openai = new OpenAIApi(configuration);

function decrypt(key, text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
const prompt = decrypt(process.env.ENCRYPT_KEY, encryptedPrompt[0]);

export const handler = async (event) => {
  const params = JSON.parse(event.body);
  const completion = await openai.createChatCompletion(JSON.parse(event.body));
  return {
    statusCode: 200,
    body: JSON.stringify([
      {
        role: 'system',
        content: prompt,
      },
      ...params.messages.map(msg => {
        return {
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        }
      }),
    ]),
  };
};

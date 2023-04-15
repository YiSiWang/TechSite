import crypto from "crypto";
import { fetch } from "undici";
import encryptedPrompt from "./encryptedPrompt.json";
import { generatePayload, parseOpenAIStream } from "./utils/openAI";

const ALGORITHM = "aes-256-cbc";
function decrypt(key, text) {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(key, "hex"),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
const apiKey = process.env.OPEN_AI;
const prompt = decrypt(process.env.ENCRYPT_KEY, encryptedPrompt[0]);

export const handler = async (event) => {
  const params = JSON.parse(event.body);
  const initOptions = generatePayload(apiKey, [
    {
      role: "system",
      content: prompt,
    },
    ...params.messages.map((msg) => {
      return {
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      };
    }),
  ]);
  const response = await fetch(
    `https://api.openai.com/v1/chat/completions`,
    initOptions
  ).catch((err) => {
    console.error(err);
    return new Response(
      JSON.stringify({
        error: {
          code: err.name,
          message: err.message,
        },
      }),
      { status: 500 }
    );
  });

  return parseOpenAIStream(response);
};

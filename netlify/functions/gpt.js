import { fetch } from "undici";

export const handler = async (event) => {
  const result = await fetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  ).then((res) => res.json());
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

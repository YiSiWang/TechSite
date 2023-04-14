export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(JSON.parse(event.body)),
  };
};

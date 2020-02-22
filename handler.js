export const hello = async () => ({
  statusCode: 200,
  body: JSON.stringify({
    message: `Go Serverless v1.0! ${(await message({ time: 1, copy: 'Your function executed successfully!' }))}`,
  }),
});
const message = ({ time, ...rest }) => new Promise((resolve) =>
  setTimeout(() => {
    resolve(`${rest.copy} (with a delay)`);
  }, time * 1000)
);

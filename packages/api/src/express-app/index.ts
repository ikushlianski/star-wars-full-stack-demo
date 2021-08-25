import express from 'express';

const app = express();

app.listen(process.env.API_PORT, () => {
  console.log(`Listening to port ${process.env.API_PORT}`);
});

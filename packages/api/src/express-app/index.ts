import express from 'express';
import { getPeopleController } from './controllers/get-people';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/people', getPeopleController);
// app.get('/person/:id', getPersonController);

app.listen(process.env.API_PORT, async () => {
  console.log(`Listening to port ${process.env.API_PORT}`);
});

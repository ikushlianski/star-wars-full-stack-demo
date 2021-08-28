import express from 'express';
import { getPeopleController } from './controllers/get-people';
import { getPersonController } from './controllers/get-person';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/people', getPeopleController);
app.get('/people/:personId', getPersonController);

app.listen(process.env.API_PORT, async () => {
  console.log(`Listening to port ${process.env.API_PORT}`);
});

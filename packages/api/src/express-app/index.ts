import express from 'express';
import { getPeopleController } from './controllers/get-people';
import { getPersonController } from './controllers/get-person';
import { countPeopleController } from './controllers/count-people';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', process.env.FRONTEND_URL);

  next();
});

app.get('/people', getPeopleController);
app.get('/people/count', countPeopleController);
app.get('/people/:personId', getPersonController);

app.listen(process.env.API_PORT, async () => {
  console.log(`Listening to port ${process.env.API_PORT}`);
});

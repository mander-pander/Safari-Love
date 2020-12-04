import express from 'express';
import { json } from 'body-parser';

import userRouter from './routers/user';
import highscoreRouter from './routers/highscore';
import startDB from './db/db';

export default function startServer() {
  const app = express();

  app.use(json());
  app.use(userRouter);
  app.use(highscoreRouter);
  
  const { PORT } = process.env;
  
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });

  startDB();
}

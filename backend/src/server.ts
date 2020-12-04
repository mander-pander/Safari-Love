import express from 'express';
import { json } from 'body-parser';

import startDB from './db/db';
import HighScore from './models/HighScore';

export default function startServer() {
  const app = express();

  app.use(json());
  
  const { PORT } = process.env;
  
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  // Routes
  app.get('/api/highscore', () => {
    console.log(HighScore.find());
  });
  
  app.post('/api/highscore', (req, res) => {
    const { name, highScore } = req.query;

    const newHighScore = new HighScore({
      name,
      highScore,
    });
  
    newHighScore.save((err, highScore) => {
      if (err) {
        res.status(404).json({
          error: 'Something went wrong while trying to save the high score.'
        });
      } else {
        res.status(200).json(highScore);
      }
    });
  });

  startDB();
}

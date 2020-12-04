import express from 'express';
import HighScore from '../models/HighScore';

const router = express.Router();

router.get('/api/highscore', async (_, res) => {
  try {
    console.log(HighScore.find());
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/api/highscore', async (req, res) => {
  try {
    const highscore = new HighScore(req.body);
    await highscore.save();
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});
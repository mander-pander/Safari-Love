import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/api/user/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);

    if (!user) {
      return res.status(401).send({
        error: 'Login failed! Check authentication credentials'
      });
    }

    const token = await user.generateAuthToken();

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error)
  }
});

export default router;

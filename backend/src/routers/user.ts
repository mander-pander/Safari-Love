import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/api/user', async (req, res) => {
  try {
    User.init();
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    console.log(user, token);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/api/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).send({
        error: 'Login failed! Check authentication credentials'
      });
    }

    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error)
  }
});

export default router;

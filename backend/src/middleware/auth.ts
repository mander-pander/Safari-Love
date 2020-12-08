import jwt from 'jsonwebtoken';
import { HookNextFunction } from 'mongoose';
import express from 'express';

import User, { IJWTToken } from '../models/User';

export interface IAuthExpressRequest {
  token: string;
}

export function auth(req: express.Request, res: express.Response, next: HookNextFunction) {
  if (!process.env.JWT_KEY) {
    throw new Error('Invalid JWT key.');
  }

  const token = req.header('Authorization')?.replace('Bearer', '');

  if (!token) {
    throw new Error('Token not found during authentication.');
  }

  const data = jwt.verify(token, process.env.JWT_KEY);

  try {
    if (typeof data !== 'object') {
      throw new Error('Incorrect credentials.');
    }

    const user = User.findOne({ _id: (data as IJWTToken)._id, token });

    if (!user) {
      throw new Error('User not found.');
    }

    (req as express.Request & IAuthExpressRequest).token = token;

    next();
  } catch (error) {
    res.status(400).send(error);
  }
}
import 'express-async-errors';

import express = require('express');

import { Request, Response } from 'express';

import MatchController from '../controllers/MatchController';
import ErrorMiddleware from '../middlewares/ErrorMiddleware';

const router = express.Router();

router.get(
  '/matches',
  (req: Request, res: Response) =>
    MatchController.getMatchs(req, res),
);

router.use(ErrorMiddleware.handler);

export default router;

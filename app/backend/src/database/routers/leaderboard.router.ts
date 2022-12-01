import 'express-async-errors';

import express = require('express');

import { Request, Response } from 'express';

import LeaderboardController from '../controllers/LeaderboardController';
import ErrorMiddleware from '../middlewares/ErrorMiddleware';

const router = express.Router();

router.get(
  '/leaderboard',
  (req: Request, res: Response) =>
    LeaderboardController.classificationLeader(req, res),
);

router.get(
  '/leaderboard/home',
  (req: Request, res: Response) =>
    LeaderboardController.filterByHomeTeam(req, res),
);

router.get(
  '/leaderboard/away',
  (req: Request, res: Response) =>
    LeaderboardController.filterByAwayTeam(req, res),
);

router.use(ErrorMiddleware.handler);

export default router;

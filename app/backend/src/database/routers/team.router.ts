import 'express-async-errors';

import express = require('express');

import { Request, Response } from 'express';

import TeamController from '../controllers/TeamController';
import ErrorMiddleware from '../middlewares/ErrorMiddleware';

const router = express.Router();

router.get(
  '/teams',
  (req: Request, res: Response) =>
    TeamController.getTeams(req, res),
);

router.get(
  '/teams/:id',
  (req: Request, res: Response) =>
    TeamController.getTeamById(req, res),
);

router.use(ErrorMiddleware.handler);

export default router;

import 'express-async-errors';

import express = require('express');

import { NextFunction, Request, Response } from 'express';

import MatchController from '../controllers/MatchController';
import ErrorMiddleware from '../middlewares/ErrorMiddleware';
import validate from '../middlewares/validate';

const router = express.Router();

router.get(
  '/matches',
  (req: Request, res: Response) =>
    MatchController.getMatchs(req, res),
);

router.post(
  '/matches',
  (req: Request, res: Response, next: NextFunction) =>
    validate.token(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    validate.teams(req, res, next),
  (req: Request, res: Response) =>
    MatchController.saveMatch(req, res),
);

router.patch(
  '/matches/:id/finish',
  (req: Request, res: Response) =>
    MatchController.changeStatusOfMatch(req, res),
);

router.use(ErrorMiddleware.handler);

export default router;

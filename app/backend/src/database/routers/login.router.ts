import 'express-async-errors';

import express = require('express');

import { NextFunction, Request, Response } from 'express';

import LoginController from '../controllers/LoginController';
import ErrorMiddleware from '../middlewares/ErrorMiddleware';
import validate from '../middlewares/validateEmail';

const router = express.Router();

router.post(
  '/login',
  (req: Request, res: Response, next: NextFunction) =>
    validate.email(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    validate.password(req, res, next),
  (req: Request, res: Response) =>
    LoginController.login(req, res),
);

router.use(ErrorMiddleware.handler);

export default router;

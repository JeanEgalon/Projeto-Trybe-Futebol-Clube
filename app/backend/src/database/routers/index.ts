import { Router } from 'express';
import loginRouter from './login.router';
import matchRouter from './match.router';
import teamRouter from './team.router';

const router = Router();

router.use(loginRouter);
router.use(teamRouter);
router.use(matchRouter);

export default router;

import { Router } from 'express';
import loginRouter from './login.router';
import teamRouter from './team.router';

const router = Router();

router.use(loginRouter);
router.use(teamRouter);

export default router;

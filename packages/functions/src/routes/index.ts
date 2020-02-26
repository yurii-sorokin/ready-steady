import { Router } from 'express';
import tauist from 'tauist';
import { moviesRouter } from './movies';
import { tvsRouter } from './tvs';
import { gamesRouter } from './games';

export const baseRouter = Router();

baseRouter.use((req, res, next) => {
  res.setHeader(
    'Cache-Control',
    `public, max-age=${tauist.s.oneDay}, max-age=${tauist.s.oneDay}`
  );
  next();
});

baseRouter.use('/', moviesRouter);
baseRouter.use('/', tvsRouter);
baseRouter.use('/', gamesRouter);

import { Router } from 'express';
import { getTvDetails, getTvs } from '../../api/tmdb';

export const tvsRouter = Router();

tvsRouter.all('/tvs', async (req, res, next) => {
  try {
    const { date, language, region } = req.body.data || req.query || {};

    const data = await getTvs({ date, language, region });

    res.send({ data });
  } catch (err) {
    next(err);
  }
});

tvsRouter.all('/tvs/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { language } = req.body.data || req.query || {};

    const data = await getTvDetails({ id, language });

    res.send({ data });
  } catch (err) {
    next(err);
  }
});

import { Router } from 'express';
import { getGames, getGameDetails } from '../../api/rawg';

export const gamesRouter = Router();

gamesRouter.all('/games', async (req, res, next) => {
  try {
    const { date, language } = req.body.data || req.query || {};

    const data = await getGames({ date, language });

    res.send({ data });
  } catch (err) {
    next(err);
  }
});

gamesRouter.all('/games/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { language } = req.body.data || req.query || {};

    const data = await getGameDetails({ id, language });

    res.send({ data });
  } catch (err) {
    next(err);
  }
});

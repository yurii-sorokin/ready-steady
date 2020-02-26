import { Router } from 'express';
import { getMovieDetails, getMovies } from '../../api/tmdb';

export const moviesRouter = Router();

moviesRouter.all('/movies', async (req, res, next) => {
  try {
    const { date, language, region } = req.body.data || req.query || {};

    const data = await getMovies({ date, language, region });

    res.send({ data });
  } catch (err) {
    next(err);
  }
});

moviesRouter.all('/movies/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { language } = req.body.data || req.query || {};

    const data = await getMovieDetails({ id, language });

    res.send({ data });
  } catch (err) {
    next(err);
  }
});

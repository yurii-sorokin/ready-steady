import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import compression from 'compression';
import cors from 'cors';
import { baseRouter } from './routes';

export const app = express();

app.use(logger('dev'));
app.use(compression());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', baseRouter);
app.use('/api', baseRouter);

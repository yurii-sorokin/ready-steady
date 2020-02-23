import { app } from './app';

const getServer = () => {
  return app.listen(process.env.PORT);
};

export const api = getServer();

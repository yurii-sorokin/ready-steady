import { app } from './app';

export const getServer = () => {
  const port = process.env.PORT || 5000;
  console.log('ZEIT NOW');

  return app.listen(5000);

  return app.listen(port, () => {
    console.log(`Start server ${port}`);
  });
};

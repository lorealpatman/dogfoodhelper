import { AppDataSource } from './data-source';

import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import cookieParser from 'cookie-parser';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        credentials: true, //front end gets access to cookie for port
        origin: ['http://localhost:3000'],
      })
    );

    routes(app);

    app.listen(8000, () => {
      console.log('Running on port 8000');
    });
  })
  .catch((error) => console.log(error));

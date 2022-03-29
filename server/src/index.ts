import { createConnection } from 'typeorm';
import express, { application } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const main = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.PG_DB_PASSWORD,
      database: 'dogfoodhelper',
      entities: ['src/entity/*.ts'],
      synchronize: true,
    });
    console.log('Connected to Postgres');

    app.use(express.json());

    app.listen(8000, () => {
      console.log('Running on port 8000');
    });
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to database');
  }
};

main();

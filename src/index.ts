import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.PG_DB_PASSWORD,
      database: 'dogfoodhelper',
    });
    console.log('Connected to Postgres');
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to database');
  }
};

main();

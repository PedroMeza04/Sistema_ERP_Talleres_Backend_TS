import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const dbLocal = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  timezone: '+00:00',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  models: [path.resolve(__dirname, '..', 'modules', '**', 'model', '*.{ts,js}')],
  logging: false
});

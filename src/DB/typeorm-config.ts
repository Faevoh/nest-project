import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    database: process.env.DB,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/DB/migrations/*.js'],
    synchronize: false,
    logging: true
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

// to run migration
// npm run migration:generate -- src/DB/migrations/<migration name>
// after that run the next command to save the migration to database
// npm run migration:run
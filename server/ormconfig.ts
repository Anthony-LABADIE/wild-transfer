// ormconfig.cjs
const { dataSource } = require("./src/lib/dataSource");

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: ["query", "error"],
  entities: ["src/entities/**/*.ts"],
  dataSource: dataSource,
  migrations: ["src/db/migrations/**/*.ts"],
  cli: {
    migrationsDir: "src/db/migrations",
  },
};

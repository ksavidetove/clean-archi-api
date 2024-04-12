import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: ".env" });

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  port: parseInt(`${process.env.DATABASE_PORT}`),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, "../**/*.entity.{js,ts}")],
  migrations: [join(__dirname, "../migrations", "*.*")],
  migrationsTableName: "migrations",
  migrationsRun: process.env.MIGRATIONS_RUN === "true",
};

export const typeorm = registerAs("typeorm", () => dataSourceOptions);

export class PaletteDataSource {
  private static dataSource: DataSource;

  public static getInstance() {
    if (this.dataSource) {
      return this.dataSource;
    }
    this.dataSource = new DataSource(dataSourceOptions);

    return this.dataSource;
  }

  public static async cleanDatabase(): Promise<void> {
    try {
      const entities = dataSource.entityMetadatas;
      const tableNames = entities
        .map((entity) => `"${entity.tableName}"`)
        .join(", ");

      await dataSource.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
    } catch (error) {
      throw new Error(`ERROR: Cleaning database: ${error}`);
    }
  }
}

export const dataSource = PaletteDataSource.getInstance();

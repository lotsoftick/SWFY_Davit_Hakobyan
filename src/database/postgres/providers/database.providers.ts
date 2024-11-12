import { DataSource } from 'typeorm';
import { InvoiceTable1731422100036 } from '../migrations';
import { InvoiceEntity } from '../entities';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'swfy',
  entities: [InvoiceEntity],
  migrations: [InvoiceTable1731422100036],
  synchronize: false,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];

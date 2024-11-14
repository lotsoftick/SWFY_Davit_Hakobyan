import { DataSource } from 'typeorm';
import { InvoiceTable1731422100036 } from '../migrations';
import { InvoiceEntity } from '../entities';
import { ClientTable1731594387438 } from '../migrations/1731594387438-ClientTable';
import { ClientEntity } from '../entities/client.entity';
import { AddClientIdToInvoiceTable1731594674228 } from '../migrations/1731594674228-AddClientIdToInvoiceTable';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'swfy',
  entities: [InvoiceEntity, ClientEntity],
  migrations: [
    InvoiceTable1731422100036,
    ClientTable1731594387438,
    AddClientIdToInvoiceTable1731594674228,
  ],
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

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddStatusQuoteNumberIssuedAtIdToInvoiceTable1731600571566
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'invoices',
      new TableColumn({
        name: 'quote_number',
        type: 'bigint',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'invoices',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'invoices',
      new TableColumn({
        name: 'issued_at',
        type: 'timestamp',
        isNullable: false,
        default: 'CURRENT_TIMESTAMP',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('invoices', 'status');
    await queryRunner.dropColumn('invoices', 'quote_number');
    await queryRunner.dropColumn('invoices', 'issued_at');
  }
}

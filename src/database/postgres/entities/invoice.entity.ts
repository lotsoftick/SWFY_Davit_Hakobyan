import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { ClientEntity } from './client.entity';

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'jsonb', nullable: true, name: 'line_items' })
  lineItems?: LineItems[];

  @Column({ type: 'jsonb', nullable: true, name: 'customer_data' })
  customerData?: object;

  @Column({ type: 'bigint', name: 'quote_number' })
  quoteNumber: number;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamp', name: 'issued_at' })
  issuedAt: Date;

  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => ClientEntity, (client) => client.invoices)
  @JoinColumn({ name: 'client_id' })
  client?: ClientEntity;
}

export class LineItems {
  @IsString()
  description: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  amount: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  price: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  units: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  vat: number;
}

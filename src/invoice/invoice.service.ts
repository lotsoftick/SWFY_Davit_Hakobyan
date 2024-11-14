import { Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceArgs } from './dto/create.invoice.args';
import { InvoiceModel } from './models/invoice.model';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';
import { InvoiceEntity } from 'src/database/postgres/entities';
import { InvoiceNotFoundException } from 'src/common/exception/invoice.exception';

@Injectable()
export class InvoiceService {
  private readonly repository: Repository<InvoiceEntity>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(InvoiceEntity);
  }

  public async findById({ id }: { id: string }) {
    const invoice = await this.repository.findOne({
      where: { id },
      relations: {
        client: true,
      },
    });

    if (!invoice) {
      throw new InvoiceNotFoundException();
    }
    return plainToInstance(InvoiceModel, invoice);
  }

  public async create(args: CreateInvoiceArgs) {
    const invoice = await this.repository.save({
      ...args,
      status: 'Draft',
      quoteNumber: Date.now(),
      issuedAt: new Date(),
    });

    console.log(invoice);
    return plainToInstance(InvoiceModel, invoice);
  }
}

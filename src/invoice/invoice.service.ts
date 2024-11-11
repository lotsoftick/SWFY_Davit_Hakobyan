import { Injectable } from '@nestjs/common';
import { CreateInvoiceArgs } from './dto/create.invoice.args';
import { InvoiceModel } from './models/invoice.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class InvoiceService {
  public async findById({ id }: { id: number }) {
    const invoice: InvoiceModel = {
      id: id,
      name: 'Invoice',
      status: 'Draft',
      quoteNumber: '1',
      lineItems: [],
      deletedAt: null,
      issuedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return plainToInstance(InvoiceModel, invoice);
  }

  public async create(args: CreateInvoiceArgs) {
    const invoice: InvoiceModel = {
      id: 1,
      name: 'Invoice',
      status: 'Draft',
      quoteNumber: '1',
      lineItems: args.line_items,
      issuedAt: new Date(),
      customerData: args.customerData,
    };

    return plainToInstance(InvoiceModel, invoice);
  }
}

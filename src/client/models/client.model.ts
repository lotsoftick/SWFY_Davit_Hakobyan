import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { InvoiceModel } from 'src/invoice/models/invoice.model';

@ObjectType()
export class ClientModel extends BaseModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [InvoiceModel])
  invoices: InvoiceModel[];
}

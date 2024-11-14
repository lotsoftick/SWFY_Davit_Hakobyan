import { BaseModel } from '../../common/models/base.model';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { IsNumber, IsString } from 'class-validator';
import { ClientModel } from 'src/client/models/client.model';

@ObjectType()
export class InvoiceLineItemsModel {
  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  amount: number;

  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  price: number;

  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  units: number;

  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  vat: number;
}

@ObjectType()
export class InvoiceModel extends BaseModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  quoteNumber: string;

  @Field(() => String)
  clientId: string;

  @Field(() => ClientModel)
  client: ClientModel;

  @Field(() => [InvoiceLineItemsModel], { nullable: true })
  lineItems: InvoiceLineItemsModel[];

  @Field({ nullable: true })
  issuedAt?: Date;

  @Field(() => GraphQLJSON, { nullable: true })
  customerData?: object;
}

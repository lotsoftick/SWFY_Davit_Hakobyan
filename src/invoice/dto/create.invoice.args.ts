import { Field, FieldOptions, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { LineItemsArgs } from './line.item.args';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateInvoiceArgs {
  @Field(() => String, {
    nullable: false,
  } as FieldOptions<string>)
  @IsNotEmpty({ message: 'client_id cannot be empty' })
  clientId: string;

  @Field(() => String, {
    nullable: true,
  } as FieldOptions<string>)
  @IsOptional()
  name?: string;

  @Field(() => [LineItemsArgs], {
    nullable: true,
  } as FieldOptions<[LineItemsArgs]>)
  @IsOptional()
  lineItems?: LineItemsArgs[];

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  customerData?: object;
}

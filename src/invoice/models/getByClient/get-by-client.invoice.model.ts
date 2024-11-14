import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { Success, SuccessOptions } from '../../../common/models/success';
import { Failure, FailureOptions } from '../../../common/models/failure';
import { InvoiceModel } from '../invoice.model';

@ObjectType()
export class GetInvoicesByClientSuccess extends Success {
  constructor(
    data: InvoiceModel[],
    options: SuccessOptions = {
      message: 'invoices found',
    },
  ) {
    super(options);
    this.data = data;
  }

  @Field(() => [InvoiceModel])
  data: InvoiceModel[];
}

@ObjectType()
export class GetInvoicesByClientFailure extends Failure {
  constructor(options: FailureOptions) {
    super(options);
  }
}

export const GetInvoicesByClientUnion = createUnionType({
  name: 'GetInvoicesByClient',
  types: () => [GetInvoicesByClientSuccess, GetInvoicesByClientFailure],
});

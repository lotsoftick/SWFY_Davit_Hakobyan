import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { Success, SuccessOptions } from '../../../common/models/success';
import { Failure, FailureOptions } from '../../../common/models/failure';
import { ClientModel } from '../client.model';

@ObjectType()
export class GetClientSuccess extends Success {
  constructor(
    data: ClientModel,
    options: SuccessOptions = {
      message: 'client found',
    },
  ) {
    super(options);
    this.data = data;
  }

  @Field(() => ClientModel)
  data: ClientModel;
}

@ObjectType()
export class GetClientFailure extends Failure {
  constructor(options: FailureOptions) {
    super(options);
  }
}

export const GetClientUnion = createUnionType({
  name: 'GetClientById',
  types: () => [GetClientSuccess, GetClientFailure],
});

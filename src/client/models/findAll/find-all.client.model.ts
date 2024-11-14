import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { Success, SuccessOptions } from '../../../common/models/success';
import { Failure, FailureOptions } from '../../../common/models/failure';
import { ClientModel } from '../client.model';

@ObjectType()
export class FindAllClientsSuccess extends Success {
  constructor(
    data: ClientModel[],
    options: SuccessOptions = {
      message: 'clients found',
    },
  ) {
    super(options);
    this.data = data;
  }

  @Field(() => [ClientModel])
  data: ClientModel[];
}

@ObjectType()
export class FindAllClientsFailure extends Failure {
  constructor(options: FailureOptions) {
    super(options);
  }
}

export const FindAllClientsUnion = createUnionType({
  name: 'FindAllClients',
  types: () => [FindAllClientsSuccess, FindAllClientsFailure],
});

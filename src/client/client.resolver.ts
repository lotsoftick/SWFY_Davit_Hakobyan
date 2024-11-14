import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientModel } from './models/client.model';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../common/exception/handler';
import { ClientService } from './client.service';
import { CreateClientArgs } from './dto/create.client.args';
import { UpdateClientArgs } from './dto/update.client.args';
import {
  CreateClientFailure,
  CreateClientSuccess,
  CreateClientUnion,
} from './models/create/create.client.model';
import {
  UpdateClientFailure,
  UpdateClientSuccess,
  UpdateClientUnion,
} from './models/update/update.client.model';
import {
  DeleteClientFailure,
  DeleteClientSuccess,
  DeleteClientUnion,
} from './models/delete/delete.client.model';
import { GetByIdArgs } from '../common/dto/get.by.id';
import {
  GetClientSuccess,
  GetClientFailure,
  GetClientUnion,
} from './models/getById/get.client.model';
import {
  FindAllClientsSuccess,
  FindAllClientsFailure,
  FindAllClientsUnion,
} from './models/findAll/find-all.client.model';

@Resolver(() => ClientModel)
export class ClientResolver {
  constructor(private readonly service: ClientService) {}

  @Mutation(() => CreateClientUnion)
  @UseFilters(new HttpExceptionFilter(CreateClientFailure))
  async createClient(@Args('args') args: CreateClientArgs) {
    try {
      const data = await this.service.create(args);
      return new CreateClientSuccess(data);
    } catch (e) {
      return new CreateClientFailure({
        message: e.message,
        alerts: [{ message: e.message }],
      });
    }
  }

  @Mutation(() => UpdateClientUnion)
  @UseFilters(new HttpExceptionFilter(UpdateClientFailure))
  async updateClient(@Args('args') args: UpdateClientArgs) {
    try {
      const data = await this.service.update(args);
      return new UpdateClientSuccess(data);
    } catch (e) {
      return new UpdateClientFailure({
        message: e.message,
        alerts: [{ message: e.message }],
      });
    }
  }

  @Mutation(() => DeleteClientUnion)
  @UseFilters(new HttpExceptionFilter(DeleteClientFailure))
  async deleteClient(@Args('id') id: string) {
    try {
      await this.service.delete(id);
      return new DeleteClientSuccess();
    } catch (e) {
      return new DeleteClientFailure({
        message: e.message,
        alerts: [{ message: e.message }],
      });
    }
  }

  @Query(() => GetClientUnion)
  @UseFilters(new HttpExceptionFilter(GetClientFailure))
  async getClientById(
    @Args('args', { type: () => GetByIdArgs }) args: GetByIdArgs,
  ) {
    try {
      const data = await this.service.findById(args.id);
      return new GetClientSuccess(data);
    } catch (e) {
      return new GetClientFailure({
        message: e.message,
        alerts: [{ message: e.message }],
      });
    }
  }

  @Query(() => FindAllClientsUnion)
  @UseFilters(new HttpExceptionFilter(FindAllClientsFailure))
  async findAllClients() {
    try {
      const data = await this.service.findAll();
      return new FindAllClientsSuccess(data);
    } catch (e) {
      return new FindAllClientsFailure({
        message: e.message,
        alerts: [{ message: e.message }],
      });
    }
  }
}

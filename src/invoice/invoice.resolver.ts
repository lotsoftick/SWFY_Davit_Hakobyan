import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { InvoiceModel } from './models/invoice.model';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../common/exception/handler';
import { InvoiceService } from './invoice.service';
import {
  CreateInvoiceFailure,
  CreateInvoiceSuccess,
  CreateInvoiceUnion,
} from './models/create/create.invoice.model';
import { CreateInvoiceArgs } from './dto/create.invoice.args';
import { InvoiceNotFoundException } from '../common/exception/invoice.exception';
import { GetByIdArgs } from '../common/dto/get.by.id';
import {
  GetInvoiceFailure,
  GetInvoiceSuccess,
  GetInvoiceUnion,
} from './models/getById/get.invoice';
import {
  GetInvoicesByClientFailure,
  GetInvoicesByClientSuccess,
  GetInvoicesByClientUnion,
} from './models/getByClient/get-by-client.invoice.model';

@Resolver(() => InvoiceModel)
export class InvoiceResolver {
  constructor(private readonly service: InvoiceService) {}

  @Query(() => GetInvoiceUnion)
  @UseFilters(new HttpExceptionFilter(GetInvoiceFailure))
  public async getQuote(
    @Args('args', { type: () => GetByIdArgs }) args: GetByIdArgs,
  ) {
    try {
      const data = await this.service.findById({
        id: args.id,
      });

      if (data) {
        return new GetInvoiceSuccess(data);
      }
      throw new InvoiceNotFoundException();
    } catch (e) {
      return new GetInvoiceFailure({ message: e.message });
    }
  }

  @UseFilters(new HttpExceptionFilter(CreateInvoiceFailure))
  @Mutation(() => CreateInvoiceUnion)
  public async createInvoice(
    @Args('args', { type: () => CreateInvoiceArgs }) args: CreateInvoiceArgs,
  ) {
    try {
      const data = await this.service.create(args);

      if (data) {
        return new CreateInvoiceSuccess(data);
      }

      throw new InvoiceNotFoundException();
    } catch (e) {
      return new CreateInvoiceFailure({ message: e.message });
    }
  }

  @Query(() => GetInvoicesByClientUnion)
  @UseFilters(new HttpExceptionFilter(GetInvoicesByClientFailure))
  public async getInvoicesByClient(
    @Args('clientId', { type: () => String }) clientId: string,
  ) {
    try {
      const data = await this.service.findByClientId(clientId);
      return new GetInvoicesByClientSuccess(data);
    } catch (e) {
      return new GetInvoicesByClientFailure({
        message: e.message,
        alerts: [{ message: e.message }],
      });
    }
  }
}

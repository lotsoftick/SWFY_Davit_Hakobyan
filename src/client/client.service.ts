import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ClientEntity } from '../database/postgres/entities/client.entity';
import { CreateClientArgs } from './dto/create.client.args';
import { UpdateClientArgs } from './dto/update.client.args';
import { plainToInstance } from 'class-transformer';
import { ClientModel } from './models/client.model';
import { ClientNotFoundException } from '../common/exception/client.exception';

@Injectable()
export class ClientService {
  private readonly repository: Repository<ClientEntity>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(ClientEntity);
  }

  async create(args: CreateClientArgs): Promise<ClientModel> {
    const client = await this.repository.save(args);
    return plainToInstance(ClientModel, client);
  }

  async update(args: UpdateClientArgs): Promise<ClientModel> {
    const client = await this.findById(args.id);

    await this.repository.update(
      { id: client.id },
      { name: args.name, updated_at: new Date() },
    );

    const updated = await this.repository.findOne({ where: { id: args.id } });
    return plainToInstance(ClientModel, updated);
  }

  async delete(id: string): Promise<void> {
    const client = await this.findById(id);
    await this.repository.softDelete(client.id);
  }

  async findById(id: string): Promise<ClientModel> {
    const client = await this.repository.findOne({
      where: { id },
      relations: {
        invoices: true,
      },
    });

    if (!client) {
      throw new ClientNotFoundException();
    }

    return plainToInstance(ClientModel, client);
  }

  async findAll(): Promise<ClientModel[]> {
    const clients = await this.repository.find({
      relations: {
        invoices: true,
      },
      order: {
        created_at: 'DESC',
      },
      where: {
        deleted_at: null,
      },
    });

    return clients.map((client) => plainToInstance(ClientModel, client));
  }
}

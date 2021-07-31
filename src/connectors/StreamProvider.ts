import { Container } from '@azure/cosmos';
import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/azure-database';
import { Stream } from 'src/models/Stream';

@Injectable()
export class StreamProvider {
  constructor(@InjectModel(Stream) private readonly container: Container) { }

  async create(item: any): Promise<any> {
    item.createdAt = new Date();
    const response = await this.container.items.create(item);
    return response.resource;
  }

  async upsert(item: any): Promise<any> {
    item.updatedAt = new Date();
    const response = await this.container.items.upsert<any>(item);
    return response.resource;
  }

  async remove(id: string, partitionKeyValue: any) {
    const item = this.container.item(id, partitionKeyValue);
    const result = await item.delete();
  }

  async findAll(): Promise<any[]> {
    const querySpec = {
      query: 'SELECT * FROM root r',
    };
    console.log(this.container);

    const results = await this.container.items
      .query<any>(querySpec, {})
      .fetchAll();
    return results.resources;
  }

  async findById(id: string): Promise<any> {
    const querySpec = {
      query: 'SELECT * FROM root r WHERE r.id=@id',
      parameters: [
        {
          name: '@id',
          value: id,
        },
      ],
    };

    const results = await this.container.items
      .query<any>(querySpec, {})
      .fetchAll();
    return results.resources.shift();
  }

  async count(): Promise<number> {
    const querySpec = {
      query: 'SELECT VALUE COUNT(1) FROM root r',
    };

    const results = await this.container.items.query(querySpec).fetchAll();
    return results.resources.shift();
  }
}

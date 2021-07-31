import { Container } from "@azure/cosmos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/azure-database";
import { Stream } from "src/models/Stream";
import { Provider } from "./Provider";

@Injectable()
export class StreamProvider implements Provider {
  constructor(@InjectModel(Stream) private readonly container: Container) {}

  async create(item: Stream): Promise<Stream> {
    item._created = new Date();
    const response = await this.container.items.create(item);
    return response.resource;
  }

  async upsert(item: Stream): Promise<Stream> {
    const response = await this.container.items.upsert<any>(item);
    return response.resource;
  }

  async remove(id: string, partitionKeyValue: any): Promise<void> {
    const item = this.container.item(id, partitionKeyValue);
    await item.delete();
  }

  async findAll(): Promise<Stream[]> {
    const querySpec = {
      query: "SELECT * FROM root r",
    };
    console.log(this.container);

    const results = await this.container.items
      .query<any>(querySpec, {})
      .fetchAll();
    return results.resources;
  }

  async findById(id: string): Promise<Stream> {
    const querySpec = {
      query: "SELECT * FROM root r WHERE r.id=@id",
      parameters: [
        {
          name: "@id",
          value: id,
        },
      ],
    };

    const results = await this.container.items
      .query<any>(querySpec, {})
      .fetchAll();
    return results.resources.shift();
  }
}

import {
  CosmosDateTime,
  CosmosPartitionKey,
  CosmosUniqueKey,
} from "@nestjs/azure-database";
import {
  Description,
  Name,
  Size,
  Stream as IStream,
} from "../../../Shared/Stream";
@CosmosPartitionKey("id")
export class Stream implements IStream {
  @CosmosUniqueKey() id: string;
  _active: boolean;
  sizes: Size[];
  type: string;
  streamProductId: number;
  unitWeight: number;
  description: Description;
  name: Name;
  @CosmosDateTime() _created: Date;
  image: string;
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

import { CosmosPartitionKey, CosmosUniqueKey } from "@nestjs/azure-database";
import {
  Logistic as ILogistic,
  SupportedWasteCollections,
} from "../../../Shared/Logistic";
import { Name } from "../../../Shared/Stream";
@CosmosPartitionKey("id")
export class Logistic implements ILogistic {
  @CosmosUniqueKey() id: string;
  name: Name;
  _active: boolean;
  supportedWasteCollections: SupportedWasteCollections[];
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

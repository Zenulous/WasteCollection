import { CosmosDateTime, CosmosUniqueKey } from "@nestjs/azure-database";
import { Container as IContainer } from "../../../Shared/Container";

export class Container implements IContainer {
  @CosmosUniqueKey() id: string;
  size: number;
  containerProductId: number;
  type: string;
  images: any[];
  description: Description;
  name: Description;
  _active: boolean;
  @CosmosDateTime() _created: Date;
  unitPricePurchase?: any;
  unitPriceRent?: any;
  unitPricePlacement: number;
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

interface Description {
  "en-gb": string;
  "nl-nl": string;
}

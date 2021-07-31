import {
  CosmosDateTime,
  CosmosPartitionKey,
  CosmosUniqueKey,
} from "@nestjs/azure-database";

@CosmosPartitionKey("id")
export class Stream {
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

interface Description {
  "nl-nl": string;
  "en-gb": string;
}

interface Name {
  "nl-nl": string;
  "en-gb": string;
}

interface Size {
  size: number;
  sizeDisplay: string;
  containerProductId: number;
  image: string;
  unitPricePurchase?: any;
  unitPriceRent: number;
  unitPricePlacement: number;
  unitPricePickup: number;
}

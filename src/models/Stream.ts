import {
  CosmosPartitionKey,
  CosmosUniqueKey,
} from '@nestjs/azure-database';

@CosmosPartitionKey('id')
export class Stream {

  @CosmosUniqueKey() id: string;
  _active: boolean;
  sizes: Size[];
  type: string;
  stream_product_id: number;
  unit_weight: number;
  description: Description;
  name: Name;
  _created: string;
  _modified: string;
  image: string;
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

interface Description {
  'nl-nl': string;
  'en-gb': string;
}

interface Name {
  'nl-nl': string;
  'en-gb': string;
}


interface Size {
  size: number;
  size_display: string;
  container_product_id: number;
  image: string;
  unit_price_purchase?: any;
  unit_price_rent: number;
  unit_price_placement: number;
  unit_price_pickup: number;
}
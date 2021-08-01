export interface Stream {
  id: string;
  _active: boolean;
  sizes: Size[];
  type: string;
  streamProductId: number;
  unitWeight: number;
  description: Description;
  name: Name;
  _created: Date;
  image: string;
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

export interface Description {
  "nl-nl": string;
  "en-gb": string;
}

export interface Name {
  "nl-nl": string;
  "en-gb": string;
}

export interface Size {
  size: number;
  sizeDisplay: string;
  containerProductId: number;
  image: string;
  unitPricePurchase?: any;
  unitPriceRent: number;
  unitPricePlacement: number;
  unitPricePickup: number;
}

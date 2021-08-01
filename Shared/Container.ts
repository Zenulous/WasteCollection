export interface Container {
  id: string;
  size: number;
  containerProductId: number;
  type: string;
  images: any[];
  description: Description;
  name: Description;
  _active: boolean;
  _created: Date;
  unitPricePurchase?: any;
  unitPriceRent?: any;
  unitPricePlacement: number;
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

export interface Description {
  "en-gb": string;
  "nl-nl": string;
}

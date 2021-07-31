export interface Provider {
  create(item: any): Promise<any>;
  upsert(item: any): Promise<any>;
  remove(id: string, partitionKeyValue: any): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any>;
}

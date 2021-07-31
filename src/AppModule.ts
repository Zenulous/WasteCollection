import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { StreamProvider } from './connectors/StreamProvider';
import { StreamsControler } from "./controllers/StreamsController";
import { Container } from '@azure/cosmos';
import * as dotenv from 'dotenv'
import { Stream } from './models/Stream';
dotenv.config();

const entities = [];

@Module({
  imports: [AzureCosmosDbModule.forRoot({
    dbName: process.env.AZURE_COSMOS_DB_NAME,
    endpoint: process.env.AZURE_COSMOS_DB_ENDPOINT,
    key: process.env.AZURE_COSMOS_DB_KEY,
  }), AzureCosmosDbModule.forFeature([{ dto: Stream }]),],
  controllers: [
    StreamsControler,
  ],
  providers: [StreamProvider, Container],
})
export class AppModule { }

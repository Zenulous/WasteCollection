import { AzureCosmosDbModule } from "@nestjs/azure-database";
import { Module } from "@nestjs/common";
import { StreamProvider } from "./providers/StreamProvider";
import { StreamsControler } from "./controllers/StreamsController";
import { Container } from "@azure/cosmos";
import * as dotenv from "dotenv";
import { Stream } from "./models/Stream";
import { LogisticControler } from "./controllers/LogisticController";
import { LogisticProvider } from "./providers/LogisticProvider";
import { Logistic } from "./models/Logistic";
import { ContainerControler } from "./controllers/ContainerController";
import { ContainerProvider } from "./providers/ContainerProvider";
import { Container as WasteContainer } from "src/models/Container";
dotenv.config();

@Module({
  imports: [
    AzureCosmosDbModule.forRoot({
      dbName: process.env.AZURE_COSMOS_DB_NAME,
      endpoint: process.env.AZURE_COSMOS_DB_ENDPOINT,
      key: process.env.AZURE_COSMOS_DB_KEY,
    }),
    AzureCosmosDbModule.forFeature([
      { dto: Stream },
      { dto: Logistic },
      { dto: WasteContainer },
    ]),
  ],
  controllers: [StreamsControler, LogisticControler, ContainerControler],
  providers: [StreamProvider, LogisticProvider, ContainerProvider, Container],
})
export class AppModule {}

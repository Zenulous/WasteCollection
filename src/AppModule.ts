import { AzureCosmosDbModule } from "@nestjs/azure-database";
import { Module } from "@nestjs/common";
import { StreamProvider } from "./providers/StreamProvider";
import { StreamsControler } from "./controllers/StreamsController";
import { Container } from "@azure/cosmos";
import * as dotenv from "dotenv";
import { Stream } from "./models/Stream";
import { LogisticsController } from "./controllers/LogisticsController";
import { LogisticProvider } from "./providers/LogisticProvider";
import { Logistic } from "./models/Logistic";
import { ContainersController } from "./controllers/ContainersController";
import { ContainerProvider } from "./providers/ContainerProvider";
import { Container as WasteContainer } from "src/models/Container";
import { SchedulesController } from "./controllers/SchedulesController";
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
  controllers: [
    StreamsControler,
    LogisticsController,
    ContainersController,
    SchedulesController,
  ],
  providers: [StreamProvider, LogisticProvider, ContainerProvider, Container],
})
export class AppModule {}

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
import { ManagedIdentityCredential } from "@azure/identity";
dotenv.config();

@Module({
  imports: [
    ...(process.env.NODE_ENV === "development"
      ? [
          AzureCosmosDbModule.forRoot({
            dbName: process.env.AZURE_COSMOS_DB_NAME,
            endpoint: process.env.AZURE_COSMOS_DB_ENDPOINT,
            key: process.env.AZURE_COSMOS_DB_KEY,
          }),
        ]
      : [
          AzureCosmosDbModule.forRoot({
            dbName: process.env.AZURE_COSMOS_DB_NAME,
            // Passwordless AAD authentication in production
            aadCredentials: new ManagedIdentityCredential(
              process.env.MANAGED_IDENTITY_CLIENT_ID,
            ),
            endpoint: process.env.AZURE_COSMOS_DB_ENDPOINT,
          }),
        ]),
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

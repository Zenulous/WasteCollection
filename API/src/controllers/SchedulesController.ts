import {
  Controller,
  HttpException,
  HttpStatus,
  Get,
  Query,
} from "@nestjs/common";
import { IsNotEmpty, IsNumberString } from "class-validator";
import { LogisticProvider } from "src/providers/LogisticProvider";
import { PostalCodeSchedule } from "../../../Shared/PostalCodeSchedule";
class scheduleDto {
  @IsNotEmpty()
  @IsNumberString()
  postalCode: string;
}
@Controller("schedules")
export class SchedulesController {
  constructor(private readonly logisticProvider: LogisticProvider) {
    this.logisticProvider = logisticProvider;
  }
  @Get()
  async retrieveSchedule(
    @Query() scheduleDto: scheduleDto,
  ): Promise<PostalCodeSchedule[]> {
    if (!(this.validatePostalCode(scheduleDto.postalCode) === true)) {
      throw new HttpException("Invalid postal code", HttpStatus.BAD_REQUEST);
    }
    console.log(await this.retrieveWasteCollections(scheduleDto.postalCode));

    return await this.retrieveWasteCollections(scheduleDto.postalCode);
  }

  validatePostalCode(postalCode: string): boolean {
    // For this assignment the postal code must be a positive integer between 1000 and 9999
    const postalCodeInt = parseInt(postalCode);
    if (
      postalCode.length === 4 &&
      postalCodeInt >= 0 &&
      postalCodeInt <= 9999
    ) {
      return true;
    }
    return false;
  }

  async retrieveWasteCollections(
    postalCode: string,
  ): Promise<PostalCodeSchedule[]> {
    const logisticProviders = await this.logisticProvider.findAll();
    console.log(logisticProviders);

    const supportedWasteCollections: PostalCodeSchedule[] = [];
    logisticProviders.forEach((provider) => {
      provider.supportedWasteCollections.forEach((wasteCollection) => {
        wasteCollection.availableAreas.forEach((availableArea) => {
          switch (availableArea.type) {
            // Type 0 is a range where the first index is the start and the last index is the end of the range
            case 0:
              if (
                availableArea.value[0] <= postalCode &&
                availableArea.value[1] >= postalCode
              ) {
                supportedWasteCollections.push({
                  logisticId: provider.id,
                  supportedWasteStreamIds:
                    wasteCollection.supportedContainerIds,
                  supportedContainerIds: wasteCollection.supportedContainerIds,
                  availability: wasteCollection.availability,
                });
              }
              break;
            // Type 1 is a range where the first index has wildcards indicated by *
            case 1:
              // TODO: write unit test
              const wildCardPostalCode = availableArea.value;
              console.log(wildCardPostalCode);

              let index = 0;
              let postalCodeIsInWildCard = true;
              for (const char of wildCardPostalCode) {
                if (!(char === "*") && postalCode[index] !== char) {
                  postalCodeIsInWildCard = false;
                }
                index++;
              }

              if (postalCodeIsInWildCard) {
                supportedWasteCollections.push({
                  logisticId: provider.id,
                  supportedWasteStreamIds:
                    wasteCollection.supportedContainerIds,
                  supportedContainerIds: wasteCollection.supportedContainerIds,
                  availability: wasteCollection.availability,
                });
              }
              break;
            default:
              break;
          }
        });
      });
    });
    return supportedWasteCollections;
  }
}

import { CosmosPartitionKey, CosmosUniqueKey } from "@nestjs/azure-database";

@CosmosPartitionKey("id")
export class Logistic {
  @CosmosUniqueKey() id: string;
  name: Name;
  _active: boolean;
  supportedWaste: SupportedWaste[];
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

interface SupportedWaste {
  supportedWasteStreamIds: number[];
  supportedContainerIds: number[];
  availableAreas: AvailableArea[];
  availability: Availability;
}

interface Availability {
  "0"?: AvailabilityOnDay;
  "1"?: AvailabilityOnDay;
  "2"?: AvailabilityOnDay;
  "3"?: AvailabilityOnDay;
  "4"?: AvailabilityOnDay;
  "5"?: AvailabilityOnDay;
  "6"?: AvailabilityOnDay;
}

interface AvailabilityOnDay {
  restrictions?: Restriction;
  timeslots: Timeslot[];
}

interface Restriction {
  type: string;
  value: string;
}

interface Timeslot {
  start: string;
  end: string;
}

interface AvailableArea {
  type: number;
  value: number[];
}

interface Name {
  "en-gb": string;
  "nl-nl": string;
}

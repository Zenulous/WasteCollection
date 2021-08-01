export interface Logistic {
  id: string;
  name: Name;
  _active: boolean;
  supportedWasteCollections: SupportedWasteCollections[];
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

export interface SupportedWasteCollections {
  supportedWasteStreamIds: number[];
  supportedContainerIds: number[];
  availableAreas: AvailableArea[];
  availability: Availability;
}

export interface Availability {
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
  type: number;
  value: string;
}

interface Timeslot {
  start: string;
  end: string;
}

interface AvailableArea {
  type: number;
  value: string[];
}

interface Name {
  "en-gb": string;
  "nl-nl": string;
}

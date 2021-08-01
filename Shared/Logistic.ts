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
  "0": AvailabilityOnDay | null;
  "1": AvailabilityOnDay | null;
  "2": AvailabilityOnDay | null;
  "3": AvailabilityOnDay | null;
  "4": AvailabilityOnDay | null;
  "5": AvailabilityOnDay | null;
  "6": AvailabilityOnDay | null;
}
interface AvailabilityOnDay {
  restrictions: Restriction[] | null;
  timeslots: Timeslot[];
}

interface Restriction {
  type: number;
  value: number;
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

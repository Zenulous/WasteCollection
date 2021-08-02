export interface PostalCodeSchedule {
  logisticId: string;
  supportedWasteStreamIds: number[];
  supportedContainerIds: number[];
  availability: Availability;
}
export interface Availability {
  [x: string]: AvailabilityOnDay | null;
  "0": AvailabilityOnDay | null;
  "1": AvailabilityOnDay | null;
  "2": AvailabilityOnDay | null;
  "3": AvailabilityOnDay | null;
  "4": AvailabilityOnDay | null;
  "5": AvailabilityOnDay | null;
  "6": AvailabilityOnDay | null;
}
export interface AvailabilityOnDay {
  restrictions: Restriction[] | null;
  timeslots: Timeslot[];
}

export interface Restriction {
  type: number;
  value: number;
}

export interface Timeslot {
  start: string;
  end: string;
}

export interface AvailableArea {
  type: number;
  value: string[];
}

export interface Name {
  "en-gb": string;
  "nl-nl": string;
}

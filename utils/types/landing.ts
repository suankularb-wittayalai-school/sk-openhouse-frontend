export type ActivitiesList = {
  name: string;
  location: string;
};

export type Faqs = {
  question: string;
  answer: string;
};

export type BusRoute = {
  infront: string[];
  opposite: string[];
};

export type MrtLocation = {
  station: string;
  exit: string;
  mapLocation: string;
};
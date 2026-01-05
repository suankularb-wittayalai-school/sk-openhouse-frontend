export type ActivitiesList = {
  name: string;
  location: string;
};

export type Faqs = {
  question: string;
  answer: React.ReactNode;
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
export type CosmoTimeZone = {
  identifier: string;
  abbreviation: string;
  secondsFromGMT: number;
};

export type CosmoCalendar = {
  identifier: string;
  firstWeekday: number;
  minimumDaysInFirstWeek: number;
  localeIdentifier: string;
  timeZone: CosmoTimeZone;
};

export type MeasurementSystem = 'metric' | 'us' | 'uk';

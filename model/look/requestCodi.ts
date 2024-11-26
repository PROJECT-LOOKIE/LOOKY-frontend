type ScheduleId = number;
type clothesId = number;
type X = number;
type Y = number;
type Size = string;

export type clothesInfo = {
  clothesId: clothesId;
  x: X;
  y: Y;
  size: Size;
};

export type CodiInfo = {
  scheduleId: ScheduleId;
  clothes: clothesInfo[];
};

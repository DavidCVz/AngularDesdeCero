export enum Region {
  Africa,
  Americas,
  Asia,
  Europe,
  Oceania
}

export const RegionMapping: Record<Region, string> = {
  [Region.Africa]: "Africa",
  [Region.Americas]: "Americas",
  [Region.Asia]: "Asia",
  [Region.Europe]: "Europe",
  [Region.Oceania]: "Oceania"
}

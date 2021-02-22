export enum Palette {
  Red = 'red',
  Pink = 'pink',
  Purple = 'purple',
  DeepPurple = 'deepPurple',
  Indigo = 'indigo',
  Blue = 'blue',
  LightBlue = 'lightBlue',
  Cyan = 'cyan',
  Teal = 'teal',
  Green = 'green',
  LightGreen = 'lightGreen',
  Lime = 'lime',
  Yellow = 'yellow',
  Amber = 'amber',
  Orange = 'orange',
  DeepOrange = 'deepOrange',
  Brown = 'brown',
  Grey = 'grey',
  BlueGrey = 'blueGrey',
}

export const PALETTES = {
  [Palette.Red]: ['#ffebee', '#b71c1c'],
  [Palette.Pink]: ['#fce4ec', '#880e4f'],
  [Palette.Purple]: ['#f3e5f5', '#4a148c'],
  [Palette.DeepPurple]: ['#ede7f6', '#311b92'],
  [Palette.Indigo]: ['#e8eaf6', '#1a237e'],
  [Palette.Blue]: ['#e3f2fd', '#0d47a1'],
  [Palette.LightBlue]: ['#e1f5fe', '#01579b'],
  [Palette.Cyan]: ['#e0f7fa', '#006064'],
  [Palette.Teal]: ['#e0f2f1', '#004d40'],
  [Palette.Green]: ['#e8f5e9', '#1b5e20'],
  [Palette.LightGreen]: ['#f1f8e9', '#33691e'],
  [Palette.Lime]: ['#f9fbe7', '#827717'],
  [Palette.Yellow]: ['#fffde7', '#f57f17'],
  [Palette.Amber]: ['#fff8e1', '#ff6f00'],
  [Palette.Orange]: ['#fff3e0', '#e65100'],
  [Palette.DeepOrange]: ['#fbe9e7', '#bf360c'],
  [Palette.Brown]: ['#efebe9', '#3e2723'],
  [Palette.Grey]: ['#fafafa', '#212121'],
  [Palette.BlueGrey]: ['#eceff1', '#263238'],
};

export enum Country {
  BE = 'BE',
  BG = 'BG',
  CZ = 'CZ',
  DK = 'DK',
  DE = 'DE',
  EE = 'EE',
  IE = 'IE',
  EL = 'EL',
  ES = 'ES',
  FR = 'FR',
  HR = 'HR',
  IT = 'IT',
  CY = 'CY',
  LV = 'LV',
  LT = 'LT',
  LU = 'LU',
  HU = 'HU',
  MT = 'MT',
  NL = 'NL',
  AT = 'AT',
  PL = 'PL',
  PT = 'PT',
  RO = 'RO',
  SI = 'SI',
  SK = 'SK',
  FI = 'FI',
  SE = 'SE',
}

export const ALL_COUNTRIES = Object.keys(Country) as Country[];

export enum MODE {
  Continous = 'continous',
  Bins = 'bins',
}

export type DataItem = {
  country: Country;
  value: number;
};

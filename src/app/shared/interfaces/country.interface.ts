export interface ICountry {
  name: IName;
  tld: string[];
  cca2: string;
  ccn3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Record<string, ICurrency>;
  idd: IIdd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Record<string, string>;
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: IDemonyms;
  cca3: string;
  translations: Record<string, ITranslation>;
  flag: string;
  maps: IMaps;
  population: number;
  fifa: string;
  car: ICar;
  timezones: string[];
  continents: string[];
  flags: IFlags;
  coatOfArms: ICoatOfArms;
  startOfWeek: string;
  capitalInfo: ICapitalInfo;
  postalCode: IPostalCode;
}

export interface IName {
  common: string;
  official: string;
  nativeName: Record<string, ITranslation>;
}

export interface ITranslation {
  official: string;
  common: string;
}

export interface ICurrency {
  symbol: string;
  name: string;
}

export interface IIdd {
  root: string;
  suffixes: string[];
}

export interface IDemonyms {
  eng: IGendered;
  fra: IGendered;
}

export interface IGendered {
  f: string;
  m: string;
}

export interface IMaps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface ICar {
  signs: string[];
  side: string;
}

export interface IFlags {
  png: string;
  svg: string;
  alt: string;
}

export interface ICoatOfArms {
  png: string;
  svg: string;
}

export interface ICapitalInfo {
  latlng: number[];
}

export interface IPostalCode {
  format: string | null;
  regex: string | null;
}

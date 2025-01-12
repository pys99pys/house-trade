export interface SearchForm {
  cityName: string;
  regionCode: string;
  year: number;
  month: number;
}

export interface RootState {
  cityName: string;
  regionCode: string;
  year: number;
  month: number;
  savedRegionCodes: string[];
}

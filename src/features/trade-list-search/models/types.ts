export type Form = {
  cityName: string;
  regionCode: string;
  year: number;
  month: number;
};
export type OnChangeFormHandler = (nextForm: Partial<Form>) => void;

export type SavedRegions = string[];
export type OnRegistRegionHandler = (regionCode: string) => void;
export type OnRemoveRegionHandler = (regionCode: string) => void;

export type OnSubmitHandler = (nextForm?: Partial<Form>) => void;

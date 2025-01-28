import { Dispatch, SetStateAction } from "react";

export type Form = {
  cityName: string;
  regionCode: string;
  year: number;
  month: number;
};
export type SetForm = Dispatch<SetStateAction<Form>>;

export type SavedRegions = string[];
export type SetSavedRegions = Dispatch<SetStateAction<string[]>>;

export type SetQueryKey = (params: { regionCode: string; year: number; month: number }) => void;

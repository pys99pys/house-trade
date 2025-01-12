import { SavedApartItem } from "../models/types";

export const createSavedApartKey = ({ regionCode, address, apartName }: SavedApartItem) => {
  return `${regionCode}__${address}__${apartName}`;
};

export const parseSavedApartItem = (key: string): SavedApartItem => {
  const [regionCode, address, apartName] = key.split("__");

  return { regionCode, address, apartName };
};

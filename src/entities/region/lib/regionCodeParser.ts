import { Region } from "../models/types";
import regionCodes from "./region-codes.json";

export const getFirstCityName = (): string => regionCodes[0].name;

export const getFirstRegionCode = (): string => regionCodes[0].children[0].code;

export const getCityNames = (): string[] => regionCodes.map((item) => item.name);

export const getRegionsFromCityName = (cityName: string): Region[] =>
  regionCodes.find((item) => item.name === cityName)?.children ?? [];

export const getCityNameFromRegionCode = (regionCode: string): string =>
  regionCodes.find((item) => item.children.some((child) => child.code === regionCode))?.name ?? "";

export const getRegionNameFromRegionCode = (regionCode: string): string =>
  regionCodes.reduce((acc, item) => [...acc, ...item.children], [] as Region[]).find((item) => item.code === regionCode)
    ?.name ?? "";

import { SavedApartItem } from "@/entities/apart";

export interface Item {
  regionCode: string;
  children: SavedApartItem[];
}

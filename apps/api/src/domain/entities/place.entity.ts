export interface PlaceEntity {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  regionId: string;
  latitude: number;
  longitude: number;
  ratingAvg: number;
  isActive: boolean;
}

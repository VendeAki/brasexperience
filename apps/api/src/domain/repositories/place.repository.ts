import type { PlaceEntity } from '../entities/place.entity';

export interface SearchNearbyParams {
  lat: number;
  lng: number;
  distanceMeters: number;
  categoryId?: string;
}

export interface PlaceRepository {
  searchNearby(params: SearchNearbyParams): Promise<PlaceEntity[]>;
}

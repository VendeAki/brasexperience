export type UserRole =
  | 'VISITOR'
  | 'SHOPKEEPER'
  | 'SERVICE_PROVIDER'
  | 'CREDENTIALED_PARTNER'
  | 'HOST'
  | 'ADMIN'
  | 'INTERNAL_TEAM';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface NearbySearchFilters {
  query?: string;
  categoryId?: string;
  distanceMeters?: number;
  minRating?: number;
  onlyOpenNow?: boolean;
  location: GeoPoint;
}

export interface PlaceCard {
  id: string;
  name: string;
  category: string;
  rating: number;
  distanceMeters: number;
  location: GeoPoint;
}

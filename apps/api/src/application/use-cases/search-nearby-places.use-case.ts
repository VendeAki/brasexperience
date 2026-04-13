import type { PlaceRepository } from '../../domain/repositories/place.repository';
import type { SearchNearbyInput } from '../dto/search-nearby.input';

const DEFAULT_DISTANCE = 1500;

export class SearchNearbyPlacesUseCase {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async execute(input: SearchNearbyInput) {
    const distanceMeters = input.distanceMeters ?? DEFAULT_DISTANCE;

    return this.placeRepository.searchNearby({
      lat: input.lat,
      lng: input.lng,
      distanceMeters,
      categoryId: input.categoryId
    });
  }
}

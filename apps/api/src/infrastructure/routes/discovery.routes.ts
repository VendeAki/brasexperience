export const discoveryRoutes = [
  {
    method: 'GET',
    path: '/v1/discovery/nearby',
    permission: 'discovery:read'
  },
  {
    method: 'GET',
    path: '/v1/discovery/places/:placeId',
    permission: 'discovery:read'
  }
] as const;

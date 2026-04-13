import type { UserRole } from '../types/user-role';

export const PERMISSIONS = {
  'discovery:read': ['VISITOR', 'SHOPKEEPER', 'SERVICE_PROVIDER', 'HOST', 'ADMIN', 'INTERNAL_TEAM'],
  'partners:create': ['SERVICE_PROVIDER', 'CREDENTIALED_PARTNER', 'ADMIN', 'INTERNAL_TEAM'],
  'partners:moderate': ['ADMIN', 'INTERNAL_TEAM'],
  'properties:create': ['HOST', 'ADMIN', 'INTERNAL_TEAM'],
  'admin:dashboard': ['ADMIN', 'INTERNAL_TEAM']
} as const satisfies Record<string, UserRole[]>;

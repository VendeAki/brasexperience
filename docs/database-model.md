# Modelagem Inicial (PostgreSQL + PostGIS)

## Tabelas núcleo

- `users`
- `roles`
- `user_roles`
- `profiles`
- `regions`
- `categories`
- `places`
- `place_images`
- `service_providers`
- `provider_availability`
- `properties`
- `property_availability`
- `booking_requests`
- `contact_requests`
- `reviews`
- `partner_credentials`
- `audit_logs`

## Notas de modelagem

- `places.location` como `geography(Point, 4326)`.
- Índice `GIST` para consultas por raio.
- `booking_requests` com estados: `PENDING`, `APPROVED`, `REJECTED`, `CANCELED`.
- `reviews` vinculada ao alvo polimórfico (`place`, `provider`, `property`).


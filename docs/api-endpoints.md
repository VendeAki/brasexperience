# Primeiros Endpoints (v1)

## Discovery

- `GET /v1/discovery/nearby`
- `GET /v1/discovery/places/:placeId`
- `GET /v1/discovery/categories`

## Partners

- `POST /v1/partners/providers`
- `GET /v1/partners/providers`
- `GET /v1/partners/providers/:providerId`
- `POST /v1/partners/contact-requests`

## Stays (fase seguinte)

- `POST /v1/stays/properties`
- `GET /v1/stays/properties`
- `POST /v1/stays/booking-requests`

## Admin

- `GET /v1/admin/overview`
- `GET /v1/admin/pending-approvals`
- `PATCH /v1/admin/providers/:providerId/approve`


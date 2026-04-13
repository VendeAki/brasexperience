# Arquitetura Inicial Recomendada

## Princípios

- **Modular Monolith primeiro**: acelera MVP sem custo operacional de microservices.
- **DDD leve + Clean Architecture**: domínio isolado de framework.
- **Escalabilidade orientada a fronteiras de módulo**: extração futura para serviços independentes.

## Camadas

1. **Presentation**: rotas HTTP, validações de entrada, serialização.
2. **Application**: casos de uso, orquestração transacional e políticas.
3. **Domain**: entidades, objetos de valor, regras de negócio.
4. **Infrastructure**: banco, filas, storage, providers externos.

## Multi-módulo

Cada módulo deve conter:

- contratos de entrada (`dto`)
- casos de uso (`application/use-cases`)
- portas de persistência (`domain/repositories`)
- adapters de saída (`infrastructure/persistence`)

## Estratégia de evolução

- Fase inicial: um banco PostgreSQL compartilhado.
- Fase crescimento: separar schema por módulo.
- Fase scale-out: extração dos módulos `stays` e `billing` para serviços separados.


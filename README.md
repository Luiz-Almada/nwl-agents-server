# NLW Agents

Projeto desenvolvido durante o evento da Rocketseat.

## Descrição

API para gerenciamento de salas, utilizando Fastify, Drizzle ORM e PostgreSQL.

## Tecnologias e Bibliotecas

- **[Fastify](https://www.fastify.io/)**: Framework web rápido para Node.js.
- **[Zod](https://zod.dev/)**: Validação de esquemas e tipagem.
- **[drizzle-orm](https://orm.drizzle.team/)**: ORM para TypeScript com suporte a PostgreSQL.
- **[drizzle-seed](https://github.com/arthurfiorette/drizzle-seed)**: Seed para popular o banco de dados.
- **[postgres](https://github.com/porsager/postgres)**: Driver PostgreSQL para Node.js.
- **[@fastify/cors](https://github.com/fastify/fastify-cors)**: Middleware CORS para Fastify.

## Padrões de Projeto

- **Barrel File**: Utilizado para exportação centralizada dos schemas ([src/db/schema/index.ts](src/db/schema/index.ts)).
- **Separation of Concerns**: Separação clara entre rotas, conexão com banco e schemas.

## Setup e Configuração

1. **Clone o repositório e instale as dependências:**
   ```sh
   npm install
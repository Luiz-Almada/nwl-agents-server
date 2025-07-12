import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { count, eq } from 'drizzle-orm'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', async () => {
    // Query the rooms from the database
    const results = await db.select({
      id: schema.rooms.id,
      name: schema.rooms.name,
      createdAt: schema.rooms.createdAt,
      questionsCount: count(schema.questions.id),
    }).from(schema.rooms)
    .leftJoin(schema.questions, eq(schema.rooms.id, schema.questions.roomId))
    .groupBy(schema.rooms.id)
    .orderBy(schema.rooms.createdAt)

    // Return the list of rooms
    return results
  })
}
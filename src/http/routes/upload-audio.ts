import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { transcribeAudio, generateEmbeddings } from '../../services/gemini.ts'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const audio = await request.file()

      if (!audio) {
        throw new Error('Audio is required')
        //return reply.status(400).send({ error: 'No audio file uploaded' })
      }

      // Acumula em memória todo o conteúdo do arquivo de áudio e não as partes
      const audioBuffer = await audio.toBuffer()
      const audioAsBase64 = audioBuffer.toString('base64')

      const transcription = await transcribeAudio(audioAsBase64, audio.mimetype)
      const embeddings = await generateEmbeddings(transcription)

      const result = await db.insert(schema.audioChunks).values({
        roomId,
        transcription,
        embeddings,
      }).returning()

      const chunk = result[0]

      if (!chunk) {
        throw new Error('Erro ao salvar chunk de áudio')
        //return reply.status(500).send({ error: 'Failed to upload audio chunk' })
      }

      return reply.status(201).send({ chunkId: chunk.id })
      // Falta:
      // 1. Trancrever o áudio usando a API do OpenAI ou Gemini
      // 2. Gerar o vetor semântico / embeddings do texto transcrito
      // 3. Armazenar os vetores no banco de dados
    }
  )
}



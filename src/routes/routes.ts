import { FastifyInstance } from 'fastify'
import { db } from '../database'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { checkSessionId } from '../middlewares/check-cookie-session-id'

export async function fightersRoutes(app: FastifyInstance) {

	app.get('/',{
		preHandler: [checkSessionId]
	},
	 async (req) => {
		const { sessionId } = req.cookies

		const bjjs = await db('bjj')
			.select()
			.where('session_id', sessionId)

		return { bjjs }
	})


	app.get('/:id', {
		preHandler: [checkSessionId]
	},
	async (req) => {
		const fighterByIdSchema = z.object({
			id: z.string().uuid()
		})

		const { id } = fighterByIdSchema.parse(req.params)

		const { sessionId } = req.cookies

		const bjj = await db('bjj')
			.where({
				id,
				session_id: sessionId
			})
			.first()

		return { bjj }
	})
	

	app.post('/', async (req, reply) => {
		const createBjjSchema = z.object({
			nome: z.string(),
			faixa: z.string(),
			peso: z.number()
		})

		const { nome, faixa, peso } = createBjjSchema.parse(req.body)

		let sessionId = req.cookies.sessionId

		if (!sessionId) {
			sessionId = randomUUID()

			reply.setCookie('sessionId', sessionId, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7
			})
		}

		await db('bjj').insert({
			id: randomUUID(),
			nome,
			faixa,
			peso,
			session_id: sessionId
		})

		return reply.status(201).send()
	})

	app.delete('/:id', async (req, reply) => {
		const fighterId = z.object({
			id: z.string().uuid()
		})

		const { id } = fighterId.parse(req.params)

		await db('bjj').where('id', id).del()

		return reply.status(204).send()
	})

	app.put('/:id', async (req, reply) => {
		const paramsSchemaId = z.object({
			id: z.string().uuid()
		})

		const bodySchema = z.object({
			nome: z.string(),
			faixa: z.string(),
			peso: z.number()
		})

		const { id } = paramsSchemaId.parse(req.params)
		const data = bodySchema.parse(req.body)

		await db('bjj').where('id', id).update(data)

		return reply.status(200).send()
	})
}
import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { fightersRoutes } from './routes/routes'

export const app = fastify()

app.register(cookie)

app.register(fightersRoutes, {
	prefix: 'bjj'
})

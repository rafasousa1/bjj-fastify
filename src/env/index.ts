import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
	config({path: '.env.test'})
} else {
	config()
}

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
	DB_CLIENT: z.enum(['sqlite', 'pg']),
	DB_URL: z.string(),
	PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error('Variáveis inváidas', _env.error.format())

	throw new Error('Variáveis inválidas')
}

export const env = _env.data
import knex from 'knex'
import { Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
	client: env.DB_CLIENT, // podendo ser sqlite ou postgrees
	connection: env.DB_CLIENT === 'sqlite' ? {
		filename: env.DB_URL
	} : env.DB_URL,
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		directory: './database/migrations'
	}
}

export const db = knex(config)
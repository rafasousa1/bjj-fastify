import knex from 'knex'
import { Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
	client: 'sqlite',
	connection: {
		filename: env.DB_URL
	},
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		directory: './database/migrations'
	}
}

export const db = knex(config)
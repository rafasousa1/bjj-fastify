import type { Knex } from 'knex'


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('bjj', (table) => {
		table.uuid('id').primary()
		table.text('nome').notNullable()
		table.text('faixa').notNullable()
		table.decimal('peso').defaultTo('70')
	})
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('bjj')
}
import { test, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Rotas dos lutadores', () => {
	beforeAll(async () => {
		app.ready()
	})

	afterAll(async () => {
		app.close()
	})

	test('Usuário pode criar seu cadastro na academia de Jiu-Jitsu', async () => {
		await request(app.server)
			.post('/bjj')
			.send({
				nome: 'Tal',
				faixa: 'Preta',
				peso: 88
			})
			.expect(201)
	})
})
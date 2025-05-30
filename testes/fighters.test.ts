import { expect, test, beforeAll, afterAll, describe } from 'vitest'
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
				nome: 'Charles',
				faixa: 'Preta',
				peso: 88
			})
			.expect(201)
	})

	test('Usuário pode listar todos os lutadores cadastrados', async () => {
		const criarNovoLutador = await request(app.server)
			.post('/bjj')
			.send({
				nome: 'Charles',
				faixa: 'Preta',
				peso: 88
			})

		const cookies = criarNovoLutador.headers['set-cookie']

		const listarLutadores = await request(app.server)
			.get('/bjj')
			.set('Cookie', cookies)
			.expect(200)

		expect(listarLutadores.body.bjjs).toEqual([
			expect.objectContaining({
				nome: 'Charles',
				faixa: 'Preta'
			})
		])
	})
})
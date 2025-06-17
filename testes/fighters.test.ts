import { expect, test, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

describe('Rotas dos lutadores', () => {
	beforeAll(async () => {
		app.ready()
	})

	afterAll(async () => {
		app.close()
	})

	beforeEach(() => {
		execSync('npm run knex migrate:rollback --all')
		execSync('npm run knex migrate:latest')
	})

	test('Usuário pode criar seu cadastro na academia de Jiu-Jitsu', async () => { //post
		await request(app.server)
			.post('/bjj')
			.send({
				nome: 'Charles',
				faixa: 'Preta',
				peso: 88
			})
			.expect(201)
	})

	test('Usuário pode listar todos os lutadores cadastrados', async () => { // get
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

	test('Usuário pode listar um lutador específico', async () => { // get pelo id
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

		const lutadorId = listarLutadores.body.bjjs[0].id

		const listarLutador = await request(app.server)
			.get(`/bjj/${lutadorId}`)
			.set('Cookie', cookies)
			.expect(200)

		expect(listarLutador.body.bjj).toEqual(
			expect.objectContaining({
				nome: 'Charles',
				faixa: 'Preta'
			})
		)
	})

	test('Usuário pode deletar um lutador cadastrado', async () => {
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

		const lutadorId = listarLutadores.body.bjjs[0].id

		await request(app.server)
			.delete(`/bjj/${lutadorId}`)
			.set('Cookie', cookies)
			.expect(204)
	})
})
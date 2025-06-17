# API de cadastro de lutadores 🥋
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Knex.js](https://img.shields.io/badge/Knex.js-222222?style=for-the-badge&logo=knex&logoColor=white)

## Descrição
API de cadastro de lutadores para uma academia de Jiu-Jitsu.
Projeto desencolvido com o framework Fastify, utilizando o Knex.js como QueryBuilder para fazer a interação com o banco de dados. A API permite cadastro, atualização e exclusão de lutadores.

## Instrução de instalação

### Pré-Requisitos
- Node.js v18+
- Fastify
- Knex.js
- Typescript

## Instrução de uso

1. Ferramenta de teste de API (Insomnia, Postman etc)
2. Executar localhost:3333/bjj

## Endpoints

### GET Lutadores
```
GET /bjj - Listando os lutadores que foram criados
```
```
{
	"bjjs": [
		{
			"id": "9a4285b8-3908-419c-8194-8db1da4a189b",
			"nome": "Miguel",
			"faixa": "Branca",
			"peso": 68,
			"session_id": "c2016eb7-c789-46f7-8e95-a8c73ce2cef1"
		},
		{
			"id": "55074bc9-20c4-4327-babf-2731cb995b1f",
			"nome": "Rafael",
			"faixa": "Azul",
			"peso": 71,
			"session_id": "c2016eb7-c789-46f7-8e95-a8c73ce2cef1"
		},
		{
			"id": "23177618-8826-4568-a7d7-254c0344c5ed",
			"nome": "Sergio",
			"faixa": "Preta",
			"peso": 82,
			"session_id": "c2016eb7-c789-46f7-8e95-a8c73ce2cef1"
		}
	]
}
```
### GET Lutador pelo id
```
GET /bjj/:id - Listando os lutadores que foram criados
```

```
localhost:3333/bjj/id
```

### POST Lutadores
```
POST /bjj - Criando um novo lutador
```
```
{
	"nome": "Sergio",
	"faixa": "Preta",
	"peso": 82
}
```

### PUT Lutador
```
PUT /bjj/:id - Atualizando um lutador específico pelo seu id
```

```
{
	"nome": "Sergio",
	"faixa": "Preta",
	"peso": 85
}
```

### DELETE Lutador
```
DELETE /bjj/:id - Removendo um lutador específico pelo seu id
```

```
localhost:3333/bjj/id
```

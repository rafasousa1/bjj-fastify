// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
    export interface Tables{
        bjj: {
            id: string,
            nome: string,
            faixa: string,
            peso: number,
            session_id?: string,
        }
    }
}
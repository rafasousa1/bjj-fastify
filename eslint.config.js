import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'


export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			globals: globals.node,
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module'
			}
		}
	},
  
	...tseslint.configs.recommended,

	{
		rules: {
			'quotes': ['error', 'single'], // Aspas simples
			  'semi': ['error', 'never'], // Sem ponto e vírgula
			  'comma-dangle': ['error', 'never'], // Nunca usar vírgula no final
			  'indent': ['error', 'tab'], // Usa tabulação para indentação
			  'prefer-arrow-callback': 'off', // Não força uso de arrow functions
			  'prefer-const': 'off', // Não força uso de const
			  'no-console': 'off' // Permite console.log
		}
	}
])
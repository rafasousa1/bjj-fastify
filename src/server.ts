import { env } from './env'
import { app } from './app'

app.listen({
	port: env.PORT || 3000, host: '0.0.0.0'
}).then( () => console.log('Server running!'))
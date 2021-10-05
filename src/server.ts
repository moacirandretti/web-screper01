import express from 'express'
import { route } from './routes'

const app = express()

app.use(express.json())

app.use(route)

app.listen(3030, () => {
  console.log('🚀 Servidor rodando na porta 3030!')
})

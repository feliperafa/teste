import 'reflect-metadata'
import 'express-async-errors'
import 'express'
import express from 'express'

import usuarioRouter from './app/routes/usuario.routes'
import loginRouter from './app/routes/login.routes'
import receitaRouter from './app/routes/receita.routes'
import verifyToken from './app/middleware/verifyToken'


const app = express()
app.use(express.json())
app.use('/auth', loginRouter)
app.use('/usuario',  usuarioRouter)
app.use('/receita', verifyToken, receitaRouter)

export default app

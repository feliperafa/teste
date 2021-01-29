import { Router } from 'express'
import usuarioController from '../controllers/usuarioController'

const usuarioRouter = Router()

usuarioRouter.post('/', usuarioController.login)

export default usuarioRouter

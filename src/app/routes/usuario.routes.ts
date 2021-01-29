import { Router } from 'express'
import usuarioController from '../controllers/usuarioController'

const usuarioRouter = Router()

usuarioRouter.post('/', usuarioController.createUsuario)
usuarioRouter.get('/', usuarioController.readUsuario)
usuarioRouter.get('/:id_usuario', usuarioController.readById)
usuarioRouter.put('/:id_usuario', usuarioController.updateUsuario)

export default usuarioRouter
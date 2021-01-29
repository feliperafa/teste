import { Router } from 'express'
import receitaController from '../controllers/receitaController'

const receitaRouter = Router()

receitaRouter.post('/', receitaController.createReceita)
receitaRouter.get('/', receitaController.readReceita)
receitaRouter.put('/:id_receita', receitaController.updateReceita)
receitaRouter.delete('/:id_receita', receitaController.deleteReceita)


export default receitaRouter
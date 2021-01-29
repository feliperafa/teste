import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Receitas } from '../models/Receitas'
import { Usuarios } from '../models/Usuarios'
import _ from 'lodash'

import decodeToken from '../utils/decodeToken'

class ReceitaController {
  createReceita = async (req: Request, res: Response) => {
    const repository = getRepository(Receitas)
    const {
      nome_receita
    } = req.body

    if (_.isEmpty(nome_receita)) {
      return res.status(400).json('Nome da receita não pode ser em branco!')
    }

    const id_usuario = decodeToken(req.headers.authorization)

    const data = {
      nome_receita,
      id_usuario
    }

    const receita = repository.create(data)

    try {
      await repository.save(receita)
    } catch (err) {
      console.log(err)
      return res.status(500).json('Internal server error!')
    }

    return res.status(201).json('criado')

  }

  readReceita = async (req: Request, res: Response) => {
    const repository = getRepository(Receitas)

    const id_usuario = decodeToken(req.headers.authorization)

    try {
      const receitas = await repository.find({ where: { id_usuario }})

      if (_.isEmpty(receitas)) {
        return res.status(404).json('Este usuario não possui receitas cadastradas')
      }
  
      return res.status(200).json(receitas)

    } catch (err) {
      return res.status(500).json('Internal Server Error!')
    }
  }

  updateReceita = async (req: Request, res: Response) => {
    const repository = getRepository(Receitas)

    const {
      nome_receita
    } = req.body

    const {
      id_receita
    } = req.params

    const usuario = decodeToken(req.headers.authorization)

    try {
      const usuarioId = await repository.findOne({where: { id_receita }, relations: ['id_usuario'] })

      if (_.isUndefined(usuarioId)) {
        return res.status(404).json('Receita não encontrada, Por favor Tente outra')
      }

      const {
        id_usuario
      } = usuarioId.id_usuario


      if (!_.isEqual(id_usuario, usuario)) {
        return res.status(404).json('Usuario não tem permissao para atualizar esta receita')
      }

      const data = {
        nome_receita
      }

      const receitaData = repository.create(data)

      await repository.update({ id_receita: parseInt(id_receita) }, receitaData)

      return res.status(200).json('Receita atualizada')
    } catch (err) {
      console.log(err)
      return res.status(500).json('Internal Server Error')
    }
  }

  deleteReceita = async (req: Request, res: Response) => {
    const repository = getRepository(Receitas)

    const {
      id_receita
    } = req.params

    const usuario = decodeToken(req.headers.authorization)

    try {
      const usuarioId = await repository.findOne({where: { id_receita }, relations: ['id_usuario'] })

      if (_.isUndefined(usuarioId)) {
        return res.status(404).json('Receita não encontrada, Por favor Tente outra')
      }

      const {
        id_usuario
      } = usuarioId.id_usuario

      if (!_.isEqual(id_usuario, usuario)) {
        return res.status(404).json('Usuario não tem permissao para Apagar esta receita')
      }

      await repository.delete({ id_receita: parseInt(id_receita)})

      return res.status(200).json('Deleted!')
    } catch (err) {
      return res.status(500).json('Internal Server Error')
    }

  }


}

export default new ReceitaController()
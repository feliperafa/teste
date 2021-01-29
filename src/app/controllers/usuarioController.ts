import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Usuarios } from '../models/Usuarios'
import _ from 'lodash'
import jwt from 'jsonwebtoken'

class UsuarioController {
  createUsuario = async (req: Request, res: Response) => {
    const repository = getRepository(Usuarios)
    const {
      nome_usuario,
      senha_usuario,
      email_usuario
    } = req.body

    const created = new Date()

    const data = {
      nome_usuario,
      senha_usuario,
      email_usuario,
      created_at: created
    }

    const usuario = repository.create(data)

    try {
      const checkUser = await repository.findOne({ where: { email_usuario } })
      if (!_.isUndefined(checkUser)) {
        return res.status(400).json('Email de usuario ja existente na base de dados!')
      }

      await repository.save(usuario)
      return res.status(201).json('Usuário criado com sucesso!')
    } catch (err) {
      return res.status(500).json('Internal server Error')
    }
  }

  readUsuario = async (req: Request, res: Response) => {
    const repository = getRepository(Usuarios)

    try {
      const usuarios = await repository.find()
      return res.status(200).json(usuarios)

    } catch (err) {
      return res.status(500).json('Internal server error!')
    }
  }

  readById = async (req: Request, res: Response) => {
    const repository = getRepository(Usuarios)

    const {
      id_usuario
    } = req.params

    try {
      const usuario = await repository.findOne({ where: { id_usuario } })
      if (_.isUndefined(usuario)) {
        return res.status(404).json('Usuário não encontrado')
      }
      return res.status(200).json(usuario)
    } catch (err) {
      return res.status(500).json('Internal server error!')
    }
  }

  updateUsuario = async (req: Request, res: Response) => {
    const repository = getRepository(Usuarios)

    const {
      nome_usuario,
      email_usuario,
      senha_usuario,
    } = req.body

    const {
      id_usuario
    } = req.params

    const updated = new Date()

    const data = {
      nome_usuario,
      email_usuario,
      senha_usuario,
      updated_at: updated
    }

    const update = repository.create(data)

    try {
      // O CAMPO EMAIL PODE SER PASSADO OU NÃO PARA UPDATE, SE FOR PASSADO, NAO PODE SER IGUAL A UM JÁ EXISTENTE
      const checkUser = await repository.findOne({ where: { email_usuario } })
      const verifyIdUsuario = await repository.findOne({ where: { id_usuario }})

        if (!_.isUndefined(checkUser)) {
          return res.status(400).json('Email já existente na base de dados, tente outro!')
        }

        if (_.isEmpty(email_usuario)) {
          return res.status(400).json('Email não pode ser em branco!')
        }

        if (_.isUndefined(verifyIdUsuario)) {
          return res.status(404).json('Usuario não encontrado na base!')
        }

      await repository.update({ id_usuario: parseInt(id_usuario) }, update)
      return res.status(200).json('updated!')
    } catch (err) {
      return res.status(500).json('Internal Server error!')
    }
  }

  login = async (req: Request, res: Response) => {
    const repository = getRepository(Usuarios)

    const {
      email,
      senha
    } = req.body

    if (_.isEmpty(email) || _.isEmpty(senha)) {
      return res.status(404).json('email ou senha não podem ser em brancos!')
    }

    const { email_usuario, senha_usuario, id_usuario } = await repository.findOne({ where: { email_usuario: email }})

    if (_.isUndefined(email_usuario)) {
      return res.status(404).json('email ou senha invalidos!')
    }
    if (!_.isEqual(senha_usuario, senha)) {
      return res.status(404).json('email ou senha invalidos!')
    }

    const token = jwt.sign({
      email_usuario,
      id_usuario
    },
    'senha_secreta',
    {
      expiresIn: '24h'
    })

    return res.status(200).json(token)
  }
}

export default new UsuarioController()


import jwt from 'jsonwebtoken'

export default function decodeToken(token: string) {
  const fullToken = token
  const parts = fullToken.split(' ')

  const { id_usuario }: any = jwt.decode(parts[1])

  return id_usuario
}
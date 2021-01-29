import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyTokenUser(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization
  if (!authorization) res.status(401).json({ error: 'No token provided' });

  const parts = authorization.split(' ');

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema)) return res.status(401).json({ error: 'Token malformatted' });

  jwt.verify(token, 'senha_secreta', (err) => {
    if (err) return res.status(401).json({ error: 'Token invalid' });

    return next();
  });
}
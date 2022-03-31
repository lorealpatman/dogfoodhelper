import { Request, Response } from 'express';
import { User } from '../entities/User';
import bcryptjs from 'bcryptjs';
import { RegisterValidation } from '../validation/register.validation';
import { sign, verify } from 'jsonwebtoken';
import { AppDataSource } from '../data-source';

export const Register = async (req: Request, res: Response) => {
  const body = req.body;

  const { error } = RegisterValidation.validate(body);
  if (error) {
    return res.status(400).send(error.details);
  }

  if (body.password !== body.passwordConfirm) {
    return res.status(400).send({
      message: 'Passwords do not match. Try Again.',
    });
  }
  const repository = AppDataSource.getRepository(User);

  const { password, ...user } = await repository.save({
    userName: body.userName,
    email: body.email,
    password: await bcryptjs.hash(body.password, 10),
  });

  res.send(user);
};

export const Login = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(User);

  const user = await repository.findOne({ where: { email: req.body.email } });

  if (!user) {
    return res.status(404).send({ message: 'invallid credentials' });
  }
  if (!(await bcryptjs.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: 'invalid credentials',
    });
  }

  const token = sign(
    {
      id: user.id,
    },
    'secret'
  );

  //only backend can use cookie, not accessible by front end - httpOnly
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, //1 day
  });

  res.send({ message: 'success' });
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
  const jwt = req.cookies['jwt'];

  const payload: any = verify(jwt, 'secret');

  if (!payload) {
    res.status(401).send({ message: 'unauthenticated' });
  }

  const repository = AppDataSource.getRepository(User);

  const { password, ...user } = await repository.findOne({
    where: { id: payload.id },
  });

  res.send(user);
};

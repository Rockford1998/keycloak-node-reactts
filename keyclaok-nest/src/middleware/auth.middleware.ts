import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('I am the AuthMiddleware.');
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException('Token not found.', HttpStatus.UNAUTHORIZED);
    }
    try {
      const publicKey = await this.getRealmPublicKey();
      const decodedToken: any = jwt.verify(token, publicKey);
      // Check issued and expiry dates
      const currentTime = Math.floor(Date.now() / 1000);
      if (+decodedToken.exp <= currentTime) {
        throw new HttpException('Token expired.', HttpStatus.UNAUTHORIZED);
      }

      req.body.user = decodedToken;
      next();
    } catch (error) {
      console.log(error);
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async getRealmPublicKey() {
    const realmPublicKeyEndpoint =
      'http://localhost:4000/realms/dcc-dev/protocol/openid-connect/certs';
    const response = await axios.get(realmPublicKeyEndpoint);
    const keys: { x5c: string[] }[] = response.data.keys;
    const publicKey = keys[1].x5c[0];
    return `-----BEGIN CERTIFICATE-----\n${publicKey}\n-----END CERTIFICATE-----`;
  }
}

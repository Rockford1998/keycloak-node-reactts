import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('I am the AuthGuard.');
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const publicKey = await this.getRealmPublicKey();
      console.log(publicKey);
      const decodedToken: any = jwt.verify(token, publicKey);

      request.user = decodedToken;
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async getRealmPublicKey() {
    const realmPublicKeyEndpoint =
      'http://localhost:8080/realms/dcc-dev/protocol/openid-connect/certs';
    const response = await axios.get(realmPublicKeyEndpoint);
    const keys: { x5c: string[] }[] = response.data.keys;
    const publicKey = keys[0].x5c[0];
    return `-----BEGIN CERTIFICATE-----\n${publicKey}\n-----END CERTIFICATE-----`;
  }
}

// -----BEGIN CERTIFICATE-----
// MIICnTCCAYUCBgGPTBVEEjANBgkqhkiG9w0BAQsFADASMRAwDgYDVQQDDAdkY2MtZGV2MB4XDTI0MDUwNjA0MDUxM1oXDTM0MDUwNjA0MDY1M1owEjEQMA4GA1UEAwwHZGNjLWRldjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALAIxWFV3Wo3FfiDp0XfFfLfibP/yi5F9cWG6Sbxk0moDHYtuuTuLUJj0OwQ8d25hdRwLasoKsCo0jsUs7RZhIV5+tV+3QGezOIzBtEvZVujyOEPjC+A4ZYbTiMhb38Yxdir9NeKmHreVDbfImyAuvnX8yASa8W+Qrty8nkN2PEI9eIumGBN/YlfLMKveSe6kokqtnK1QLlBMLa494HrG0Pb4q3FiUzAAEYiWN6q8JHCJSaRf0rEMeNOHrg8qfJX9VuPiR0dbPMQFGIxb5KY7HhHA+jIoxFaQ86PQz+mV3hTp7twlCsc6pDufaFYB1HUymMnFtB8JBJA2raMlIppM+UCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAIPcg7FMfVzcZgVJtpFEHgTdfMRb+WfW70+ur/lKZ5vEl+kIm+3MSmKe3AVvu2b42On2dFu726yw0t4xFTLuwpBwYOft+IhhTTntdK3kqMrty0WZnVPgPFd5Tq1ZbjsR+sf1062orkV+UB0RO1EaoJNahdIq4Jb9mwTO/9nLEsNvGFE0sg4ovNPIUi5VDp6L/qiktqSSZ0D0oX85+MViZ5VM3kB57dJnrg06DwBy+Wy+SPfAjxuvrlNfO0jyeYe6+IE0gGclnLjZLRgSdYDRQF8o//S2OmoUJu13hR+Zakv5d4C6+hJO1jiOpeT+skzaFd3vJt8m3oMpxkZzqdR2Y4g==
// -----END CERTIFICATE-----

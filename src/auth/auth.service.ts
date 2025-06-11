// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import axios, { AxiosResponse } from 'axios';
// import { TokenValidationResponse } from './dto/response/TokenValidationResponse';

// @Injectable()
// export class AuthService {
//   private readonly springBootUrl: string;

//   constructor(private configService: ConfigService) {
//     this.springBootUrl =
//       this.configService.get<string>('SPRING_BOOT_URL') ||
//       'http://localhost:8080';
//   }

//   async validateToken(token: string): Promise<TokenValidationResponse> {
//     try {
//       const response: AxiosResponse<TokenValidationResponse> = await axios.post(
//         `${this.springBootUrl}/api/v1/auth/validate-token`,
//         { token },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           timeout: 5000,
//         },
//       );

//       return response.data;
//     } catch (error) {
//       console.error('Error al validar el token:', error);
//     }
//   }
// }

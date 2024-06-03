// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class RolesMiddleware implements NestMiddleware {
//   constructor(private readonly reflector: Reflector) {}
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('I am Role middleware');
//     try {
//       const handler = this.reflector.getAllAndOverride<boolean>('isPublic', [
//         context.getHandler(),
//         context.getClass(),
//       ]);
//       console.log({ handler });
//       // const requiredRoles: string[] = this.getRequiredRoles(req);

//       // const { user } = req.body;

//       // if (!user || !user.realm_access || !user.realm_access.roles) {
//       //   return res.status(401).json({ message: 'Unauthorized' });
//       // }

//       // if (!this.hasRequiredRole(user.realm_access.roles, requiredRoles)) {
//       //   return res.status(403).json({ message: 'Forbidden' });
//       // }
//       next();
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // private getRequiredRoles(req: Request): string[] {
//   //   const handler = this.reflector.get<string[]>(
//   //     'roles',
//   //     req.route?.stack[0]?.handle,
//   //   );
//   //   console.log({ handler });
//   //   return handler || [];
//   // }

//   // private hasRequiredRole(
//   //   userRoles: string[],
//   //   requiredRoles: string[],
//   // ): boolean {
//   //   return requiredRoles.some((role) => userRoles.includes(role));
//   // }
// }

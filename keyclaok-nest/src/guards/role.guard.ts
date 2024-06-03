import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: any = this.reflector.getAllAndOverride<String[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    console.log({ requiredRoles });
    const { user } = context.switchToHttp().getRequest();
    return user.realm_access.roles.includes(requiredRoles.roles[0]);
  }
}

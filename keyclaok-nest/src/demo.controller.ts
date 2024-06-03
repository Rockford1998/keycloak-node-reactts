import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { RolesGuard } from './guards/role.guard';
import {
  FilterInterceptor,
  PaginationInterceptor,
} from './intercept/logging.intercepter';

@Controller('/demo')
export class DemoController {
  @Get('/admin')
  @UseGuards(RolesGuard)
  @UseInterceptors(FilterInterceptor, PaginationInterceptor)
  @Roles({ roles: ['EMPLOYEE_READ'] })
  IsAdminLoggedIn() {
    return 'I am admin';
  }

  @Get('/health')
  @Unprotected()
  health() {
    return 'Server is alive';
  }
}

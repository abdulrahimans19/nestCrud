import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { RoleGuard } from 'src/shared/Guards/roles.guard';
import { UserRoles } from 'src/user/schema/user.schema';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(UserRoles.ADMIN)
  @UseGuards(RoleGuard)
  @Get(':id')
  async getUserDetails(@Param('id') userId: string) {
    return this.adminService.getUserDetails(userId);
  }

  @Roles(UserRoles.ADMIN)
  @UseGuards(RoleGuard)
  @Post('block/:id')
  async blockUser(@Param('id') userId: string) {
    return this.adminService.blockUser(userId);
  }

  @Roles(UserRoles.ADMIN)
  @UseGuards(RoleGuard)
  @Post('unblock/:id')
  async unblockUser(@Param('id') userId: string) {
    return this.adminService.unblockUser(userId);
  }

  @Roles(UserRoles.ADMIN)
  @UseGuards(RoleGuard)
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.adminService.deleteUser(userId);
  }
}

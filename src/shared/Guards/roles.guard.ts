import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/user.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflecor: Reflector,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflecor.get('roles', context.getHandler());
        const req: any = context.switchToHttp().getRequest();
        console.log(req.user.sub);
        
        
        const user = await this.userService.getUserById(req.user.sub);
        console.log(req.user.sub);
        
        const role = user.roles;
       
        
        if (roles.includes(role)) return true;
        return false;
    }
}
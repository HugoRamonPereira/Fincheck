import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // This route me is created only to get the id of the user in the accessToken that we passed using the sub which is the subject
  @Get('/me')
  me(@Req() request: any) {
    return this.usersService.getUserById(request.userId);
  }
}

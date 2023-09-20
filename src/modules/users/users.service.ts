import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    });
  }

  // THIS IS ANOTHER WAY WE COULD IMPLEMENT THE CODE ABOVE USING ASYNC/AWAIT AND RETURNING WHAT WE WANT, THE WAY ABOVE IS USING SELECT

  // async getUserById(userId: string) {
  //   const user = await this.usersRepo.findUnique({
  //     where: { id: userId },
  //   });

  //   // Did this to avoid returning the password, even though it is encrypted
  //   return {
  //     name: user.name,
  //     email: user.email,
  //   };
  // }
}

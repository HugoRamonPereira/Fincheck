import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    // Validation of the email, in the prisma schema we added the id and email to be unique
    // So if we try to create a new user with an existing email in the database it will not allow us to do that
    const emailAlreadyTaken = await this.prismaService.user.findUnique({
      where: { email },
    });
    // Custom email message added
    if (emailAlreadyTaken) {
      throw new ConflictException('This email has already been taken');
    }

    // The second argument passed after password, the number 10 is called salt and will icrease the time to create the password
    // It will make the lives of hackers more difficult
    const hashedPassword = await hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salary', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Other', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Home', icon: 'home', type: 'EXPENSE' },
              { name: 'Food', icon: 'food', type: 'EXPENSE' },
              { name: 'Education', icon: 'education', type: 'EXPENSE' },
              { name: 'Leizure', icon: 'leizure', type: 'EXPENSE' },
              { name: 'Market', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Clothing', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transportation', icon: 'transport', type: 'EXPENSE' },
              { name: 'Travel', icon: 'travel', type: 'EXPENSE' },
              { name: 'Other', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    return user;
  }
}

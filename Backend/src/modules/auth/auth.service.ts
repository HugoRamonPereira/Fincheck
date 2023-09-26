import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { SigninDto } from './dto/signin.dto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    //Checking if passwords are the same using compare from bcryptjs
    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('Passwords do not match!');
    }

    // After we validated if the user exists and the passwords match then we create the JWT
    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    // Validation of the email, in the prisma schema we added the id and email to be unique
    // So if we try to create a new user with an existing email in the database it will not allow us to do that
    const emailAlreadyTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });
    // Custom email message added
    if (emailAlreadyTaken) {
      throw new ConflictException('This email has already been taken');
    }

    // The second argument passed after password, the number 10 is called salt and will icrease the time to create the password
    // It will make the lives of hackers more difficult
    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepo.create({
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

    // After we validated if the user created his/her account then we create the JWT
    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}

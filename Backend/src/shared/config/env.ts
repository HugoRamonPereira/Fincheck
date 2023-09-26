import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  dbURL: string;
}

// plainToInstance is used to validate the instance of a given object.
export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  dbURL: process.env.DATABASE_URL,
});

// Validate Sync will return an array with all the errors.
const errors = validateSync(env);

// The properties (null, 2) added after the errors were passed to help read the error message in the console in a more clear way
if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}

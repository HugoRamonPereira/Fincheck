import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class ParseOptionalUUIDPipe extends ParseUUIDPipe {
  override transform(value: string, metadata: ArgumentMetadata) {
    // This if conditional is making the value of value optional
    // If you send the id as UUID it will be validate
    // If you send a string different than the UUID patter an error will be thrown
    // If you send no value in the field of bankAccount than nothing happens, it passes our validation
    if (typeof value === 'undefined') {
      return undefined;
    }

    return super.transform(value, metadata);
  }
}

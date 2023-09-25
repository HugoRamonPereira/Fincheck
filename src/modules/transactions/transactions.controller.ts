import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.transactionsService.findAllByUserId(userId);
  }

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(
      userId,
      transactionId,
      updateTransactionDto,
    );
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ) {
    return this.transactionsService.remove(userId, transactionId);
  }
}

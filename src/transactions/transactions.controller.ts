import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Logger,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  private readonly logger = new Logger(TransactionsController.name);

  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully' })
  async create(@Body() createDto: CreateTransactionDto) {
    this.logger.log(`Creating transaction for userId=${createDto.userId}`);

    const result = await this.transactionsService.create(createDto);

    this.logger.log(
      `Transaction created with id=${(result as any)?._id ?? 'unknown'}`,
    );
    return result;
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  findAll() {
    this.logger.log('Fetching all transactions');
    return this.transactionsService.findAll();
  }

  @Get('by-user/:userId')
  findByUserId(@Param('userId') userId: string) {
    this.logger.log(`Fetching transactions for userId=${userId}`);
    return this.transactionsService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiParam({ name: 'id', example: '661f1c2b9c1234567890abcd' })
  findOne(@Param('id') id: string) {
    this.logger.log(`Fetching transaction id=${id}`);
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update transaction' })
  update(@Param('id') id: string, @Body() updateDto: UpdateTransactionDto) {
    this.logger.log(`Updating transaction id=${id}`);
    return this.transactionsService.update(id, updateDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   this.logger.log(`Deleting transaction id=${id}`);
  //   return this.transactionsService.remove(id);
  // }
}

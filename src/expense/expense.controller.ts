import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/expense.dto';
import { Auth } from 'src/auth/guards/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/guards/decorators/user.decorator';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post(':categoryId')
  @HttpCode(200)
  @Auth()
  create(
    @Body() dto: CreateExpenseDto,
    @CurrentUser('id') userId,
    @Param('categoryId') categoryId: string,
  ) {
    return this.expenseService.create(categoryId, userId, dto);
  }

  @Get('category/:categoryId')
  @HttpCode(200)
  @Auth()
  findByCategory(
    @CurrentUser('id') userId,
    @Param('categoryId') categoryId: string,
  ) {
    return this.expenseService.findByCategory(categoryId, userId);
  }

  @Get('category/:categoryId/sum')
  @HttpCode(200)
  @Auth()
  getDifference(
    @CurrentUser('id') userId,
    @Param('categoryId') categoryId: string,
  ) {
    return this.expenseService.getDifference(categoryId, userId);
  }

  @Get()
  @Auth()
  findAll(@CurrentUser('id') userId: string, id: string) {
    return this.expenseService.find(userId, id);
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth()
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.expenseService.remove(userId, id);
  }

  @Put(':id')
  @HttpCode(200)
  @Auth()
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: CreateExpenseDto,
  ) {
    return this.expenseService.update(userId, id, dto);
  }
}

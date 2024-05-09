import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { ExpenseModule } from 'src/expense/expense.module';
import { ExpenseService } from 'src/expense/expense.service';

@Module({
  imports: [UserModule, ExpenseModule],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, ExpenseService],
})
export class CategoryModule {}

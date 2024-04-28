import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ExpenseModule } from './expense/expense.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, ExpenseModule, CategoryModule],
})
export class AppModule {}

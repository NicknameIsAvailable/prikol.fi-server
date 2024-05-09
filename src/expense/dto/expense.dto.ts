import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsString,
  MaxLength,
} from 'class-validator';
import { Currency } from 'prisma/generated/client';

export class CreateExpenseDto {
  @IsInt({
    message: 'Amount must be an integer',
  })
  amount: number;

  @IsEnum(Currency, {
    message: 'Wrong currency',
  })
  currency: Currency;

  @IsString()
  @IsDateString()
  date: string;

  @IsString()
  @MaxLength(1000, {
    message: 'Description max length is 1000 characters',
  })
  description: string;

  @IsBoolean()
  isExpense: boolean;
}

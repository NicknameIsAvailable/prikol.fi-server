import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateExpenseDto {
  @IsInt({
    message: 'Amount must be an integer',
  })
  amount: number;

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

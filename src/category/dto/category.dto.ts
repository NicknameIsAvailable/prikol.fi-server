import {
  IsBoolean,
  IsHexColor,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CategoryDto {
  @IsString()
  @MinLength(6, {
    message: 'Name must be at least 6 characters long',
  })
  @MaxLength(120, {
    message: 'Name too long',
  })
  name: string;

  @IsString()
  @MinLength(0, {
    message: 'Description must be at least 6 characters long',
  })
  @MaxLength(1000, {
    message: 'Description too long',
  })
  description: string;

  @IsString({
    message: 'Icon name must be string',
  })
  iconName: string;

  @IsHexColor({
    message: 'Color must be hexcolor',
  })
  color: string;

  @IsUUID('4', {
    message: 'User id must be valid UUID',
  })
  userId: string;

  @IsBoolean()
  isExpense: boolean;
}

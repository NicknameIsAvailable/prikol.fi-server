import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Auth } from 'src/auth/guards/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/guards/decorators/user.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @HttpCode(200)
  @Auth()
  create(@CurrentUser('id') id: string, @Body() dto: CategoryDto) {
    if (!id) throw new UnauthorizedException('You are not authorized');

    return this.categoryService.create(id, dto);
  }

  @Get(':id')
  @HttpCode(200)
  @Auth()
  find(@CurrentUser('id') userId: string, @Param('id') id: string) {
    if (!userId) throw new UnauthorizedException('You are not authorized');

    return this.categoryService.find(userId, id);
  }

  @Get()
  @HttpCode(200)
  @Auth()
  findAll(@CurrentUser('id') userId: string, @Param('id') id: string) {
    if (!userId) throw new UnauthorizedException('You are not authorized');
    if (id) return this.categoryService.find(userId, id);
    return this.categoryService.find(userId);
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth()
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    if (!userId) throw new UnauthorizedException('You are not authorized');

    return this.categoryService.remove(userId, id);
  }
}

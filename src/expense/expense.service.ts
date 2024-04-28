import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/expense.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  create(categoryId: string, userId: string, dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        ...dto,
        categoryId,
        userId,
      },
      include: {
        category: true,
      },
    });
  }

  async find(userId?: string, id?: string) {
    const result = await this.prisma.expense.findMany({
      where: {
        AND: [
          { id },
          {
            userId: {
              equals: userId,
            },
          },
        ],
      },
    });

    if (result.length === 0) throw new NotFoundException('Category not found');

    return result;
  }

  async update(userId: string, id: string, dto: CreateExpenseDto) {
    const result = await this.prisma.expense.updateMany({
      where: {
        AND: [
          { id },
          {
            userId: {
              equals: userId,
            },
          },
        ],
      },
      data: dto,
    });

    if (result.count === 0) throw new NotFoundException('Category not found');

    return result;
  }

  async remove(userId: string, id: string) {
    const result = await this.prisma.expense.deleteMany({
      where: {
        AND: [
          { id },
          {
            userId: {
              equals: userId,
            },
          },
        ],
      },
    });

    if (result.count === 0) throw new NotFoundException('Category not found');

    return result;
  }
}

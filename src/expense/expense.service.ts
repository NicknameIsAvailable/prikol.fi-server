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

  async findByCategory(categoryId: string, userId?: string) {
    const result = await this.prisma.expense.findMany({
      where: {
        AND: [
          { categoryId },
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

  async getExpenseSum(categoryId?: string, userId?: string) {
    const result = await this.prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        isExpense: true,
        userId,
        categoryId,
      },
    });

    return result;
  }

  async getIncomeSum(categoryId?: string, userId?: string) {
    const result = await this.prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        categoryId,
      },
    });

    return result;
  }

  async getDifference(categoryId?: string, userId?: string) {
    const incomeSum = await this.getIncomeSum(categoryId, userId);
    const expenseSum = await this.getExpenseSum(categoryId, userId);

    const result = {
      incomes: incomeSum._sum.amount,
      expenses: expenseSum._sum.amount,
      difference: incomeSum._sum.amount - expenseSum._sum.amount,
    };

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

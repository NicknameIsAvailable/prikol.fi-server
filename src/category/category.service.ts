import { UserService } from './../user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(userId: string, dto: CategoryDto) {
    const data = {
      userId,
      ...dto,
    };

    const result = this.prisma.category.create({
      data,
    });
    return result;
  }

  async find(userId?: string, id?: string) {
    const result = await this.prisma.category.findMany({
      where: {
        AND: [
          { id },
          {
            OR: [
              {
                userId: {
                  equals: userId,
                },
              },
              {
                AND: [
                  {
                    isDefault: true,
                  },
                  {
                    NOT: {
                      userId: {
                        equals: userId,
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    if (result.length === 0) throw new NotFoundException('Category not found');

    return result;
  }

  async remove(userId: string, id: string) {
    const result = await this.prisma.category.deleteMany({
      where: {
        AND: [
          { id },
          {
            OR: [
              {
                userId: {
                  equals: userId,
                },
              },
              {
                AND: [
                  {
                    isDefault: false,
                  },
                  {
                    NOT: {
                      userId: {
                        equals: userId,
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    if (result.count === 0) throw new NotFoundException('Category not found');

    return result;
  }
}

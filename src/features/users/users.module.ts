import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from '../../prisma';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './features/todos/todo.module';
import { ApiError } from './errors/api.error';
import { UsersModule } from './features/users/users.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      formatError: (error) => {
        let statusCode = 500;
        let code = error.extensions?.code;
        let message = error.message;

        if (error.extensions.name == ApiError.name) {
          const err = error as any;
          statusCode = err.extensions?.statusCode;
          message = error.message;
          code = err.extensions?.code;
        }
        const formattedError = {
          statusCode,
          message,
          code,
          path: error.path || [],
        };

        return formattedError;
      },
    }),
    PrismaModule,
    TodoModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('graphql');
  }
}

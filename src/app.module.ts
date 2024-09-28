import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './DB/typeorm-config';
import { RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ProductsModule,
    AuthModule,
    RateLimiterModule.register({
      points: 10,
      duration: 60,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};

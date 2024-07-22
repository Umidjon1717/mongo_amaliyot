import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, ServicesModule, OrdersModule, MongooseModule.forRoot('mongodb://localhost/Service_Order')],
  controllers: [],
  providers: [],
})
export class AppModule {}

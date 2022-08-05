/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './products/product.module';
@Module({
  imports: [ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://sparsh2:Sparsh01@cluster0.o2rxg.mongodb.net/nestapi?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

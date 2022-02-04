import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './modules/coffee-rating/coffee-rating.module';
import { CoffeeRatingService } from './services/coffee-rating/coffee-rating.service';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '983453069',
      database: 'coffees',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoffeeRatingModule,
  ],

  controllers: [AppController],
  providers: [AppService, CoffeeRatingService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module'; 
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ imports: [ConfigModule],
      inject : [ConfigService],  
      useFactory: (configService: ConfigService) =>{
        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          autoLoadEntities: true, 
          synchronize: true, 
        };
      }
      
    }),
    UsersModule,
    
  ],
  
  controllers: [AppController],
  providers: [],
  
})

export class AppModule {
  constructor (){
    console.log(process.env.DATABASE_PASSWORD)
  }
}

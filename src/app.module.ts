import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { DatabaseModule } from './database/database.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [ServicesModule, DatabaseModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

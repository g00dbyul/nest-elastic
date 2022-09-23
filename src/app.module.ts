import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PlaceModule} from "./domain/place/place.module";
import {AppConfigModule} from "./common/app-config/app-config.module";

@Module({
  imports: [AppConfigModule, PlaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

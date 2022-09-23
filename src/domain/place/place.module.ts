import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import {ElasticsearchModule} from "@nestjs/elasticsearch";
import {AppConfigService} from "../../common/app-config/app-config.service";
import {AppConfigModule} from "../../common/app-config/app-config.module";

@Module({
  imports: [
      ElasticsearchModule.registerAsync({
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) => configService.elasticsearchConfig,
    }),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}

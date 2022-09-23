import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import * as Joi from 'joi';

@Module({
  imports: [BaseConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV}`,
    validationSchema: Joi.object({
      ELS_URL: Joi.string().required(),
    })
  })],
  providers: [AppConfigService],
  exports: [BaseConfigModule, AppConfigService]
})
export class AppConfigModule {}

import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    private getNumber(key: string): number {
        return Number(this.get(key));
    }

    private getBoolean(key: string): boolean {
        return Boolean(JSON.parse(this.get(key)));
    }

    private getString(key: string): string {
        return this.get(key).replace(/\\n/g, '\n');
    }

    get nodeEnv(): string {
        return this.getString('NODE_ENV');
    }

    get elasticsearchConfig() {
        return {
            node: this.getString('ELS_URL'),
        };
    }

    private get(key: string): string {
        const value = this.configService.get<string>(key);
        return value;
    }
}

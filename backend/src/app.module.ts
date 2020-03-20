import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';

import { MobileModule } from './mobile/mobile.module';

@Module({
  imports: [CsvModule, MobileModule],
})
export class AppModule {}

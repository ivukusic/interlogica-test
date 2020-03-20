import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';

import { MobileController } from './mobile.controller';
import { MobileService } from './mobile.service';

@Module({
  imports: [CsvModule],
  controllers: [MobileController],
  providers: [MobileService],
})
export class MobileModule {}

import { Module } from '@nestjs/common';
import { MobileModule } from './mobile/mobile.module';

@Module({
  imports: [MobileModule],
})
export class AppModule {}

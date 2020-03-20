import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChangedEnum } from '../interfaces/mobile.interface';

export class SaveNumberDto {
  @ApiProperty()
  @IsNotEmpty()
  number: number;

  @ApiProperty({ enum: ['first-two', 'first-two-fourth'] })
  @IsNotEmpty()
  changed: ChangedEnum;
}

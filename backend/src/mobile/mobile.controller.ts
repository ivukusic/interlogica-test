import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  ParseIntPipe,
  Body,
  UploadedFile,
  UseInterceptors,
  Patch,
  ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MobileService } from './mobile.service';
import { SaveNumberDto } from './dto/save-number.dto';

@Controller('mobile')
export class MobileController {
  constructor(private mobileService: MobileService) {}

  @Get()
  getNumbers(@Query('page', ParseIntPipe) page: number) {
    return this.mobileService.getNumbers(page);
  }

  @Patch('/:id')
  saveNumbers(@Param('id') id: string, @Body() saveNumberDto: SaveNumberDto) {
    return this.mobileService.saveNumberById(id, saveNumberDto);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    if (file.mimetype !== 'text/csv') {
      throw new ForbiddenException('Not supported file type');
    }
    return await this.mobileService.readCSV(file);
  }
}

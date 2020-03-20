import { Test } from '@nestjs/testing';
import { MobileController } from './mobile.controller';
import { MobileService } from './mobile.service';
import { ForbiddenException } from '@nestjs/common';

const mockNumber = {
  id: '103220561',
  isValid: true,
  deleted: false,
  number: 824469836,
  originalNumber: 824469836,
  changed: null,
  suggestions: [{ number: 27824469836, changed: 'first-two' }],
};
const mockNumbers = {
  page: 1,
  total: 1,
  data: {
    '103220561': mockNumber,
  },
};

describe('MobileController', () => {
  let mobileController: MobileController;
  let mobileService: MobileService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MobileController],
      providers: [MobileService],
    }).compile();

    mobileService = moduleRef.get<MobileService>(MobileService);
    mobileController = moduleRef.get<MobileController>(MobileController);
  });

  describe('getNumbers', () => {
    it('should return an object with numbers and pagination', async () => {
      mobileService.getNumbers = jest.fn().mockResolvedValue(mockNumbers);
      expect(await mobileController.getNumbers(1)).toEqual(mockNumbers);
    });
  });

  describe('saveNumbers', () => {
    it('should return an object with current number', async () => {
      mobileService.saveNumberById = jest.fn().mockResolvedValue(mockNumber);
      expect(await mobileController.saveNumbers('103220561', { number: 27824469836, changed: 'first-two' })).toEqual(
        mockNumber,
      );
    });
  });

  describe('uploadFile', () => {
    it('should throw an error because of wrong file type', async () => {
      mobileService.saveNumberById = jest.fn().mockResolvedValue(mockNumber);
      expect(mobileController.uploadFile({ mimetype: 'image/png' })).rejects.toThrow(ForbiddenException);
    });

    it('should return an object with numbers and pagination on file upload', async () => {
      mobileService.readCSV = jest.fn().mockResolvedValue(mockNumbers);
      expect(await mobileController.uploadFile({ mimetype: 'text/csv', buffer: 'buffer' })).toEqual(mockNumbers);
    });
  });
});

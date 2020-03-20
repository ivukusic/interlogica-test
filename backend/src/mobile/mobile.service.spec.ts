import { Test } from '@nestjs/testing';
import * as mockfs from 'mock-fs';
import * as path from 'path';
import { MobileService } from './mobile.service';

const mockNumber = {
  id: '103220561',
  isValid: true,
  deleted: false,
  number: 824469836,
  originalNumber: 824469836,
  changed: null,
  suggestions: [{ number: 27824469836, changed: 'first-two' }],
};
const mockExpectedNumber = {
  ...mockNumber,
  changed: 'first-two',
  number: 27824469836,
  suggestions: null,
};
const mockNumbers = {
  page: 1,
  total: 1,
  data: {
    '103220561': mockNumber,
  },
};
const buffer = `id,sms_phone
103220561,824469836`;

describe('MobileService', () => {
  let mobileService: MobileService;
  const dirPath = path.join(__dirname, '/../db/');

  beforeAll(() => {
    mockfs({ [dirPath]: { 'db.json': `${JSON.stringify(mockNumbers.data)}` } });
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MobileService],
    }).compile();
    mobileService = await module.get<MobileService>(MobileService);
  });

  afterAll(() => {
    mockfs.restore();
  });

  describe('getNumbers + saveNumberById', () => {
    it('gets numbers from db.json', async () => {
      const resGet = await mobileService.getNumbers(1);
      expect(resGet).toEqual(mockNumbers);
      const resSave = await mobileService.saveNumberById('103220561', { number: 27824469836, changed: 'first-two' });
      expect(resSave).toEqual(mockExpectedNumber);
    });

    it('gets empty object on error', async () => {
      mockfs({ [dirPath]: { 'db.json': {} } });
      const res = await mobileService.getNumbers(1);
      expect(res).toEqual({ data: {}, page: 1, total: 0 });
    });
  });

  describe('parseCSV', () => {
    it('parse csv and return data', async () => {
      const res = await mobileService.readCSV({ buffer });
      expect(res).toEqual({ ...mockNumbers, data: { [mockNumber.id]: mockExpectedNumber } });
    });
  });
});

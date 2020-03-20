import Axios from '../../core/Axios';
import { getNumbers, updateNumber, uploadFile } from './numbers.service';

const mockSuggestion = { number: 12312, changed: 'changed' };

const globalAny: any = global;
class FormData {
  append = jest.fn();
}
globalAny.FormData = FormData;

describe('Numbers service', () => {
  describe('getNumbers', () => {
    let getMethod: any;
    beforeEach(() => {
      getMethod = jest.fn();
      Axios.get = getMethod;
    });

    it('should successfully return data on success', async () => {
      const value = 'some value';
      getMethod.mockResolvedValue({ data: value });
      expect(await getNumbers(1)).toEqual({ success: true, data: value });
    });

    it('should successfully return null on fail', async () => {
      getMethod.mockRejectedValue();
      expect(await getNumbers(1)).toEqual({
        success: false,
        error: 'Something went wrong. Please try again',
      });
    });
  });

  describe('updateNumber', () => {
    let patchMethod: any;
    beforeEach(() => {
      patchMethod = jest.fn();
      Axios.patch = patchMethod;
    });

    it('should successfully return data on success', async () => {
      const value = 'some value';
      patchMethod.mockResolvedValue({ data: value });
      expect(await updateNumber('1', mockSuggestion)).toEqual({ success: true, data: value });
    });

    it('should successfully return null on fail', async () => {
      patchMethod.mockRejectedValue();
      expect(await updateNumber('1', mockSuggestion)).toEqual({
        success: false,
        error: 'Something went wrong. Please try again',
      });
    });
  });

  describe('uploadFile', () => {
    let postMethod: any;
    beforeEach(() => {
      postMethod = jest.fn();
      Axios.post = postMethod;
    });

    it('should successfully return data on success', async () => {
      const value = 'some value';
      postMethod.mockResolvedValue({ data: value });
      expect(await uploadFile('file')).toEqual({ success: true, data: value });
    });

    it('should successfully return null on fail', async () => {
      postMethod.mockRejectedValue();
      expect(await uploadFile('file')).toEqual({ success: false, error: 'Something went wrong. Please try again' });
    });
  });
});

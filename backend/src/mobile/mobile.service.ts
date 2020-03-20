import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csvtojson';

import { MobileInterface } from './interfaces/mobile.interface';
import { isValidMobileNumber, getSuggestions } from '../utils/number.util';
import { SaveNumberDto } from './dto/save-number.dto';

const pageObjects = (obj: Record<string, MobileInterface>, page: number): any => {
  const perPage = 10;
  const first = (page - 1) * perPage;
  const last = page * 10;
  const filteredKeys = Object.keys(obj).filter(key => !obj[key].deleted);
  const data = filteredKeys.slice(first, last).reduce((memo, current) => {
    memo[current] = obj[current];
    return memo;
  }, {});
  return {
    data,
    page,
    total: Math.ceil(Object.keys(filteredKeys).length / perPage),
  };
};

@Injectable()
export class MobileService {
  private numbers: Record<string, MobileInterface> = {};

  async getNumbers(page): Promise<Record<string, MobileInterface>> {
    this.numbers = await this.readFile();
    return pageObjects(this.numbers, page);
  }

  async saveNumberById(id: string, saveNumberDto: SaveNumberDto): Promise<MobileInterface> {
    const isValid = isValidMobileNumber(saveNumberDto.number);
    this.numbers[id] = {
      ...this.numbers[id],
      ...saveNumberDto,
      isValid,
      suggestions: isValid ? null : getSuggestions(`${saveNumberDto.number}`),
    };
    this.saveFile(JSON.stringify(this.numbers));
    return this.numbers[id];
  }

  readFile = async (): Promise<Record<string, MobileInterface>> => {
    const filePath = path.join(__dirname, '/../db/db.json');
    return new Promise(resolve => {
      fs.readFile(filePath, (error, data: any) => {
        if (error) {
          resolve({});
        } else {
          try {
            const dataJson: Record<string, any> = JSON.parse(data.toString('utf8'));
            resolve(dataJson);
          } catch (error) {
            resolve({});
          }
        }
      });
    });
  };

  saveFile = (data: string) => {
    const dirPath = path.join(__dirname, '/../db');
    const fileName = '/db.json';
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    const filePath = path.join(dirPath, fileName);
    try {
      fs.writeFileSync(filePath, data);
    } catch (error) {}
  };

  readCSV = async (file: any): Promise<any> => {
    this.numbers = await this.parseCSV(file);
    this.saveFile(JSON.stringify(this.numbers));
    return pageObjects(this.numbers, 1);
  };

  parseCSV = (file: any): Promise<Record<string, MobileInterface>> => {
    return new Promise(async resolve => {
      const data = {};
      try {
        await csv({ output: 'csv' })
          .fromString(file.buffer.toString('utf8'))
          .then(csvRow => {
            csvRow.forEach(row => {
              let changed = null;
              const id = row[0];
              let number = row[1];
              const deleted = number.includes('_DELETED_');
              const originalNumber = deleted ? null : parseInt(number);
              let suggestions = getSuggestions(number);
              if (suggestions.length === 1) {
                number = suggestions[0].number;
                changed = suggestions[0].changed;
                suggestions = null;
              }
              const isValid = isValidMobileNumber(number);
              data[id] = {
                id,
                changed,
                originalNumber,
                number: deleted ? null : parseInt(number, 10),
                isValid,
                suggestions,
                deleted,
              };
            });
          });
        resolve(data);
      } catch (e) {
        resolve(data);
      }
    });
  };
}

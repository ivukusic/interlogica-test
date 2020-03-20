import Axios from '../../core/Axios';
import { SuggestionInterface, MobileInterface } from '../types/number.interface';

interface ReturnValue {
  success: boolean;
  data?: MobileInterface;
  error?: string;
}

export const getNumbers = async (page: number): Promise<ReturnValue> => {
  try {
    const { data } = await Axios.get(`/mobile?page=${page}`);
    return { success: true, data };
  } catch (e) {
    let error = 'Something went wrong. Please try again';
    if (e && e.response && e.response.data && e.response.data.error) {
      error = e.response.data.error;
    }
    return { success: false, error };
  }
};

export const updateNumber = async (id: string, suggestion: SuggestionInterface): Promise<ReturnValue> => {
  try {
    const { data } = await Axios.patch(`/mobile/${id}`, { ...suggestion });
    return { success: true, data };
  } catch (e) {
    let error = 'Something went wrong. Please try again';
    if (e && e.response && e.response.data && e.response.data.error) {
      error = e.response.data.error;
    }
    return { success: false, error };
  }
};

export const uploadFile = async (file: string | Blob): Promise<ReturnValue> => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const { data } = await Axios.post(`/mobile/upload`, formData);
    return { success: true, data };
  } catch (e) {
    let error = 'Something went wrong. Please try again';
    if (e && e.response && e.response.data && e.response.data.error) {
      error = e.response.data.error;
    }
    return { success: false, error };
  }
};

export default {
  getNumbers,
  updateNumber,
  uploadFile,
};

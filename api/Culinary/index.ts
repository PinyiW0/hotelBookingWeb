import { fetchData } from '~/utils/request';
import type { CulinaryInfo } from './types';


export default {
  /** 獲取 美味佳餚 列表 */
  Load(): Promise<any> {
    return fetchData('/home/culinary', { method: 'GET' });
  },
  /** 獲取 美味佳餚 單筆 */
  Get(id: string): Promise<{ result: CulinaryInfo }> {
    return fetchData(`/home/culinary/${id}`, { method: 'GET' });
  },
}
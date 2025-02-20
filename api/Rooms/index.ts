import { fetchData } from '~/utils/request';
import type { RoomsInfo } from './types';


export default {
  /** 獲取 房型 列表 */
  Load(): Promise<any> {
    return fetchData('/Rooms', { method: 'GET' });
  },
  /** 獲取 房型資訊 單筆 */
  Get(id: string): Promise<{ result: RoomsInfo }> {
    return fetchData(`/Rooms/${id}`, { method: 'GET' });
  },
}
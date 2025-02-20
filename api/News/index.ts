import { fetchData } from '~/utils/request';
import type { NewssInfo } from './types';


export default {
  /** 獲取 最新消息 列表 */
  Load(): Promise<any> {
    return fetchData('/home/news', { method: 'GET' });
  },
  /** 獲取 最新消息 單筆 */
  Get(id: string): Promise<{ result: NewssInfo }> {
    return fetchData(`/home/news/${id}`, { method: 'GET' });
  },
}
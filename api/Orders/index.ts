import { fetchData } from '~/utils/request';
import type { OrderListInfo, AddOrderQuery } from './types';


export default {
  /** 取得自己的訂單列表 */
  GetList(): Promise<{ result: OrderListInfo[] }> {
    return fetchData('/orders/', { method: 'GET' });
  },
  /** 新增訂單 */
  AddOrder(body: AddOrderQuery): Promise<{ result: OrderListInfo }> {
    return fetchData('/orders/', { method: 'POST', body });
  },
  /** 取得 訂單詳細資訊 */
  GetInfo(id: string): Promise<{ result: OrderListInfo }> {
    return fetchData(`/orders/${id}`, { method: 'GET' });
  },
  /** 取消訂單 */
  Delete(id: string): Promise<any> {
    return fetchData(`/orders/${id}`, { method: 'DELETE' });
  },
}
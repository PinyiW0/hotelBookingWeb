import { fetchData } from '~/utils/request';
import type { EmailQuery } from './types';


export default {
  /** 驗證信箱是否註冊過 */
  CheckMail(body: EmailQuery): Promise<any> {
    return fetchData('/verify/email', { method: 'POST', body });
  },
  /** 產生信箱驗證碼 */
  GetVerifyCode(body: EmailQuery): Promise<any> {
    return fetchData('/verify/generateEmailCode', { method: 'POST', body });
  },
}
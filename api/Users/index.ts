import { fetchData } from '~/utils/request';
import type { LoginQuery, SignInQuery, SignInData } from './types';


export default {
  /** 登入 */
  Login(body: LoginQuery): Promise<any> {
    return fetchData('/user/Login', { method: 'post', body });
  },
  /** 註冊 */
  SignIn(body: SignInQuery): Promise<{ result: SignInData }> {
    return fetchData('/user/signup', { method: 'post' });
  },
}
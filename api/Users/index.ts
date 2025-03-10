import { fetchData } from '~/utils/request';
import type { LoginQuery, SignInQuery, SignInData, ForgotPswQuery, UserInfo, UserQuery } from './types';


export default {
  /** 登入 */
  Login(body: LoginQuery): Promise<any> {
    return fetchData('/user/login', { method: 'POST', body });
  },
  /** 註冊 */
  SignIn(body: SignInQuery): Promise<{ status: boolean, result: SignInData }> {
    return fetchData('/user/signup', { method: 'POST', body });
  },
  /** 忘記密碼 */
  ForgotPsw(body: ForgotPswQuery): Promise<any> {
    return fetchData('/user/forgot', { method: 'POST', body });
  },
  /** 檢查是否登入 */
  Check(): Promise<any> {
    return fetchData('/user/check', { method: 'GET' });
  },
  /** 取得 使用者資訊 */
  GetInfo(): Promise<{ result: UserInfo }> {
    return fetchData('/user/', { method: 'GET' });
  },
  /** 更新 使用者資訊 */
  UpdateInfo(body: UserQuery): Promise<any> {
    return fetchData('/user/', { method: 'PUT', body });
  },
}
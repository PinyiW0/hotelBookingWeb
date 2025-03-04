import type { UserInfo } from '@/api/Users/types'
export const useUserInfoStore = defineStore('user', () => {
  const user = ref<UserInfo | null>(null);
  const token = ref<string | null>(null);
  // 儲存使用者資訊
  const setUserInfo = (userInfo: UserInfo, userToken: string) => {
    user.value = userInfo;
    token.value = userToken;
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('token', userToken);
  };
  // 清除使用者資訊
  const clearUserInfo = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  // 取得使用者資訊
  const getUserInfo = (): UserInfo | null => {
    if (!user.value) {
      const userData = localStorage.getItem('user')
      if (userData) {
        user.value = JSON.parse(userData)
      }
    }
    return user.value
  };

  return {
    user,
    token,
    getUserInfo,
    setUserInfo,
    clearUserInfo,
  }
});
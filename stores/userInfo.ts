import type { UserInfo } from '@/api/Users/types'
export const useUserInfoStore = defineStore('user', () => {
  const user = ref<UserInfo | null>(null);
  // 儲存使用者資訊
  const setUserInfo = (userInfo: UserInfo) => {
    user.value = userInfo;
    localStorage.setItem('user', JSON.stringify(userInfo));
  };
  // 清除使用者資訊
  const clearUserInfo = () => {
    user.value = null
    localStorage.removeItem('user')
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
    getUserInfo,
    setUserInfo,
    clearUserInfo,
  }
});
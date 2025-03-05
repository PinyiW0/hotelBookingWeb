import type { UserInfo } from '@/api/Users/types'
export const useUserInfoStore = defineStore('user', () => {
  const user = ref<UserInfo | null>(null);
  const token = ref<string | null>(null);
  const userCookie = useCookie('user');
  const tokenCookie = useCookie('token');

  if (userCookie.value) {
    try {
      user.value = JSON.parse(userCookie.value);
    } catch (error) {
      console.error('Parse user cookie error:', error);
    }
  };
  if (tokenCookie.value) {
    token.value = tokenCookie.value;
  };
  // 儲存使用者資訊
  const setUserInfo = (userInfo: UserInfo, userToken: string) => {
    user.value = userInfo;
    token.value = userToken;
    userCookie.value = JSON.stringify(userInfo);
    tokenCookie.value = userToken;
  };
  // 清除使用者資訊
  const clearUserInfo = () => {
    user.value = null;
    token.value = null;
    userCookie.value = null;
    tokenCookie.value = null;
  };
  // 取得使用者資訊
  const getUserInfo = (): UserInfo | null => {
    const userCookie = useCookie('user');
    if (userCookie.value) {
      try {
        user.value = JSON.parse(userCookie.value);
      } catch (error) {
        console.error('Parse user cookie error:', error);
      }
    }
    return user.value;
  };

  return {
    user,
    token,
    getUserInfo,
    setUserInfo,
    clearUserInfo,
  }
});
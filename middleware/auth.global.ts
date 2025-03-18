import { useUserInfoStore } from '@/stores/userInfo';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserInfoStore();
  const requiresAuth = to.matched.some((record: any) => record.meta.requiresAuth)
  if (requiresAuth && !userStore.token) {
    if (import.meta.client) {
      const { $swal } = useNuxtApp() as any
      await $swal.fire({
        icon: 'warning',
        title: '您需要先登入',
        confirmButtonText: '確定'
      })
    };
    return navigateTo('/login');
  };
});
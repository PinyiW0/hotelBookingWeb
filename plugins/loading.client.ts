export default defineNuxtPlugin((nuxtApp) => {
  const loading = useState('loading', () => false);

  nuxtApp.hook('page:start', () => {
    loading.value = true;
  });
  nuxtApp.hook('page:finish', () => {
    loading.value = false;
  });
});
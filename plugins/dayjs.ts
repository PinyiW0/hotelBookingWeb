import { defineNuxtPlugin } from "#app";
import dayjs from 'dayjs';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('dayjs', dayjs)
});
// 型別定義
declare module "#app" {
  interface NuxtApp {
    $dayjs: typeof dayjs;
  }
}

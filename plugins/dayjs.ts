import { defineNuxtPlugin } from "#app";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
dayjs.locale('zh-tw');

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('dayjs', dayjs)
});
// 型別定義
declare module "#app" {
  interface NuxtApp {
    $dayjs: typeof dayjs;
  }
}

<script setup lang="ts">
import type { FormRules } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
import CityCountyData from 'assets/json/cityCountyData.json';
const { $dayjs } = useNuxtApp();
$dayjs.locale('zh-tw');
defineOptions({
  name: 'RoomsIdBooking'
});
// TODO:之後要做動態 SEO
useSeoMeta({
  title: '預約房型',
  description: '預約房型',
});

const id = route.params.id;
/** 返回上一頁 */
const goBack = () => {
  router.back();
};
/** 編輯入住與退房日期 */
const isEditing = ref(false);
const bookingDateRange = ref<any>(null);
if (route.query.checkInDate && route.query.checkOutDate) {
  bookingDateRange.value = [
    new Date(route.query.checkInDate as string),
    new Date(route.query.checkOutDate as string)
  ];
};
/** 時間格式轉換 */
const formattedDates = computed(() => {
  return {
    checkIn: bookingDateRange.value && bookingDateRange.value[0]
      ? $dayjs(bookingDateRange.value[0]).format('MM 月 DD 日 dddd')
      : '未選擇',
    checkOut: bookingDateRange.value && bookingDateRange.value[1]
      ? $dayjs(bookingDateRange.value[1]).format('MM 月 DD 日 dddd')
      : '未選擇'
  };
});
const disabledStartDate = (time: any) => {
  return time.getTime() < $dayjs().subtract(1, 'day');
};

/** form */
interface LoginInForm {
  name: string;
  phone: string;
  email: string;
};
const form = ref<LoginInForm>({
  name:'',
  phone:'',
  email:'',
});
/** 驗證 */
const rules = reactive<FormRules>({
  name:[{required: true, message:'姓名為必填', trigger:['blur', 'change']}],
  phone:[{required: true, message:'手機號碼為必填', trigger:['blur', 'change']}],
  email:[
    {required: true, message:' 電子信箱為必填', trigger:['blur', 'change']},
    {type:'email', message:' 電子信箱格式錯誤', trigger:['blur', 'change']},
  ],
});
</script>

<template>
  <section class="w-full bg-primary-10">
    <div class="px-3 flex flex-col gap-10">
      <button @click="goBack" class="mt-10 p-0 flex items-center border-0 bg-transparent cursor-pointer">
        <div class="i-material-symbols:arrow-back-ios w-6 h-6" />
        <h2 class="text-6 lg:text-8 font-bold">確認訂房資訊</h2>
      </button>
      <!-- 訂房資訊 -->
      <div class="pb-10 flex flex-col gap-8 border-b-(px solid gray-60)">
        <h3 class="text-5 lg:text-7 font-bold">訂房資訊</h3>
        <div class="flex flex-col gap-8">
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-2">
              <severTitle title="選擇房型" />
              <p class="tetx-4 tracking-wider">尊爵雙人房</p>
            </div>
            <button class="p-0 text-4 font-bold border-0 border-b-(px solid #000) bg-transparent cursor-pointer duration-300 hover:opacity-60">編輯</button>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-2">
              <severTitle title="訂房日期" />
              <div v-if="isEditing">
                <el-date-picker
                    v-model="bookingDateRange"
                    :disabled-date="disabledStartDate"
                    start-placeholder="請選擇入住日期"
                    end-placeholder="退房日期"
                    type="daterange"
                    size="large"
                  />
              </div>
              <div v-else class="flex flex-col gap-2">
                <p class="tetx-4 tracking-wider">入住：{{ formattedDates.checkIn }}</p>
                <p class="tetx-4 tracking-wider">退房：{{ formattedDates.checkOut }}</p>
              </div>
            </div>
            <button @click="isEditing = !isEditing" class="p-0 text-4 font-bold border-0 border-b-(px solid #000) bg-transparent cursor-pointer duration-300 hover:opacity-60">{{ isEditing ? '儲存' : '編輯' }}</button>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-2">
              <severTitle title="房客人數" />
              <p class="tetx-4 tracking-wider">2人</p>
            </div>
            <button class="p-0 text-4 font-bold border-0 border-b-(px solid #000) bg-transparent cursor-pointer duration-300 hover:opacity-60">編輯</button>
          </div>
        </div>
      </div>
      <!-- 訂房人資訊 -->
       <div class="py-10 flex flex-col gap-8 border-b-(px solid gray-60)">
        <h3 class="text-5 lg:text-7 font-bold">訂房人資訊</h3>
        <!-- form -->
        <el-form :model="form":rules="rules" class="flex flex-col gap-4">
          <el-form-item label="姓名" label-position="top" prop="name">
            <el-input v-model="form.name" placeholder="請輸入姓名" />
          </el-form-item>
          <el-form-item label="手機號碼" label-position="top" prop="phone">
            <el-input v-model="form.phone" placeholder="請輸入手機號碼" />
          </el-form-item>
          <el-form-item label="電子信箱" label-position="top" prop="email">
           <el-input v-model="form.email"  placeholder="請輸入電子信箱" />
          </el-form-item>
          <el-form-item label="地址" label-position="top" prop="birthday">
            
            <!-- <div class="w-full flex items-center gap-2">
              <el-select v-model="form.city" placeholder="請選擇縣市" class="!h-52px" size="large">
                <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="form.county" placeholder="請選擇區域" class="!h-52px" size="large">
                <el-option v-for="item in county" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
            <el-input v-model="form.birthday" placeholder="請輸入詳細地址" class="mt-2" /> -->


            <select id="address" class="form-select p-3 rounded-3" >
                  <option
                    v-for="(city, index) in CityCountyData"
                    :key="city.CityName"
                    :value="index"
                  >
                    {{ city.CityName }}
                  </option>
                </select>

          </el-form-item>
        </el-form>
       </div>
    </div>
  </section>
</template>

<style scoped></style>
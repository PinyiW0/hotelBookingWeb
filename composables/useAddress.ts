import CityCountyData from '~/assets/json/cityCountyData.json';

export const useAddress = () => {
  const selectedCity = ref('');
  const selectedCounty = ref('');

  // 取得區域列表
  const getAreaList = computed(() => {
    const cityData = CityCountyData.find((city) => city.CityName === selectedCity.value);
    return cityData ? cityData.AreaList : [];
  });

  // 重設城市並清除區域
  const resetCity = (city: string) => {
    selectedCity.value = city;
    selectedCounty.value = '';
  };

  // 取得郵遞區號
  const getZipCode = (city: string, county: string): string => {
    const cityData = CityCountyData.find(c => c.CityName === city);
    const areaData = cityData?.AreaList.find(a => a.AreaName === county);
    return areaData?.ZipCode || '';
  };

  // 重組地址
  const formatAddr = (city: string, county: string, detail: string): string => {
    return [city, county, detail].filter(Boolean).join('');
  };

  return {
    selectedCity,
    selectedCounty,
    getAreaList,
    resetCity,
    getZipCode,
    formatAddr
  }
}
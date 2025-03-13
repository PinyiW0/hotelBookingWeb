import CityCountyData from '~/assets/json/cityCountyData.json';

export const useAddress = (defaultCity = '', defaultCounty = '') => {
  const selectedCity = ref(defaultCity);
  const selectedCounty = ref(defaultCounty);

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

  // 透過 ZipCode 去找尋對應的縣市區域資料
  const getCityCountyFromZip = (zip: string): { city: string, county: string } | null => {
    const cityData = CityCountyData.find(city =>
      city.AreaList.some(area => area.ZipCode === zip)
    );
    if (!cityData) return null;
    const areaData = cityData.AreaList.find(area => area.ZipCode === zip);
    return { city: cityData.CityName, county: areaData?.AreaName || '' };
  };


  return {
    selectedCity,
    selectedCounty,
    getAreaList,
    resetCity,
    getZipCode,
    formatAddr,
    getCityCountyFromZip
  }
}
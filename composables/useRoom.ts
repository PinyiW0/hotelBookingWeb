export const useRoom = () => {
  const { $dayjs } = useNuxtApp();
  /**
   * 計算入住晚數
   * @param checkInDate 入住日期字串
   * @param checkOutDate 退房日期字串
   * @returns 住宿晚數
   */
  const stayDays = (checkInDate: string, checkOutDate: string): number => {
    return $dayjs(checkOutDate).diff($dayjs(checkInDate), 'day');
  };

  /**
   * 計算房間總價錢
   * @param checkInDate 入住日期字串
   * @param checkOutDate 退房日期字串
   * @param pricePerNight 每晚房價
   * @returns 房間總價
   */
  const calTotalPrice = (checkInDate: string, checkOutDate: string, pricePerNight: number): number => {
    const nights = stayDays(checkInDate, checkOutDate);
    return nights * pricePerNight;
  };

  /** 篩選有提供的房內設備 */
  const getFacilityInfo = (order: any): any[] => {
    return order?.roomId?.facilityInfo?.filter((item: any) => item.isProvide) || [];
  };

  /** 篩選有提供的房內備品 */
  const getAmenityInfo = (order: any): any[] => {
    return order?.roomId?.amenityInfo?.filter((item: any) => item.isProvide) || [];
  };

  return {
    stayDays,
    calTotalPrice,
    getFacilityInfo,
    getAmenityInfo
  };
}
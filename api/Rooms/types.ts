export interface RoomsInfo {
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  layoutInfo: layoutInfoType[];
  facilityInfo: layoutInfoType[];
  amenityInfo: layoutInfoType[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface layoutInfoType {
  title: string;
  isProvide: boolean;
}

/** booking 訂房人基本資料 */
export interface LoginInForm {
  name: string;
  phone: string;
  email: string;
  city: string;
  cities?: string;
  county: string;
  addr: string;
};
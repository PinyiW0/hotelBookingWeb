/** 取得自己的訂單列表 回傳參數 */
export interface OrderListInfo {
  userInfo: userInfoData;
  _id: string;
  roomId: roomIdData;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  orderUserId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface userInfoData {
  address: addrObj;
  name: string;
  phone: string;
  email: string;
}

export interface addrObj {
  zipcode: number;
  detail: string;
}

export interface roomIdData {
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  layoutInfo: InfoData[];
  facilityInfo: InfoData[];
  amenityInfo: InfoData[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface InfoData {
  title: string;
  isProvide: boolean;
}

/** 使用者註冊 回傳參數 */
export interface SignInData {
  address: newAddrObj;
  _id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
export interface newAddrObj {
  zipcode: number;
  detail: string;
  city: string;
  county: string;
}

/** 新增訂單 傳送參數*/
export interface AddOrderQuery {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number,
  userInfo: userInfoData;
}
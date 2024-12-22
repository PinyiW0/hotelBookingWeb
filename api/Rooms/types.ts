export interface RoomsInfo {
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string;
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  layoutInfo:layoutInfoType[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface layoutInfoType {
  title: string;
  isProvide: boolean;
}

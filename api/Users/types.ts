/** 使用者登入 傳送參數 */
export interface LoginQuery {
  email: string;
  password: string;
}
/** 使用者註冊 傳送參數 */
export interface SignInQuery {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  address: addrObj;
}
export interface addrObj {
  zipcode?: number;
  city?: string;
  county?: string;
  detail?: string;
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

/** 忘記密碼 傳送參數*/
export interface ForgotPswQuery {
  email: string;
  code: string;
  newPassword: string;
}
/** 使用者資訊 回傳參數*/
export interface UserInfo {
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
/** 更新使用者資訊 傳送參數*/
export interface UserQuery {
  userId: string;
  name?: string;
  phone?: string;
  birthday?: string;
  address?: addrObj;
  oldPassword?: string;
  newPassword?: string;
}

/** 註冊 Step.1 Form */
export interface LoginInForm {
  email: string;
  password: string;
  confirmPassword: string;
};

/** 註冊 Step.1 */
export interface Step {
  value: number;
  label: string;
  completed: boolean;
};

/** 修改密碼區域 */
export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
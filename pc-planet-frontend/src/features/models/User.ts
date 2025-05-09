export interface Registration {
  firstName: string;
  lastName?: string;
  username?: string;
  email: string;
  phone: number | null;
  type?: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface IAuthUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface IAuthResponse {
  message: string;
  data: {
    user: IAuthUser;
  };
}

export interface IMeResponse {
  message: string;
  data: {
    user: IAuthUser;
  };
}

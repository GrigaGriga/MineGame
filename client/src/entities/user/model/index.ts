export interface IUserLoginData {
    email: string;
    password: string;
  }
  
  export interface IUserSignUpData extends IUserLoginData {
    name: string;
  }
  
  export interface IUser {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IAuthResponseData {
    user: IUser;
    accessToken: string;
  }

  export enum AuthStatus {
    PENDING = 'pending',
    GUEST = 'guest',
    AUTHORIZED = 'authorized',
  }

  export type AuthSliceT =
  | {
      status: AuthStatus.PENDING;
      user:null
      // buttonLoading: boolean;
    }
  | {
      status: AuthStatus.GUEST;
      user:null
      // buttonLoading: boolean;
    }
  | {
      status: AuthStatus.AUTHORIZED;
      user: IUser;
      // buttonLoading: boolean;
    };
export interface IStat {
    id: number;
    userId: number;
    points: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserWithStats {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    Stats: IStat[]; 
  }

export type StatActionTypes = 
{ type: 'SET_STAT'; payload: IStat[] }

export type StatHandlerType = {
    StatHandler: () => Promise<void>;
}
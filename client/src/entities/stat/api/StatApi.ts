import { isAxiosError, type AxiosInstance } from 'axios';
import{ axiosInstance } from '../../../shared/lib/axiosInstance';
import type { IStat, IUserWithStats } from '../model';

class StatService {
    constructor(private readonly client: AxiosInstance) {}
    async getAllStat(): Promise<IStat> {
        
            const { data } = await this.client.get<IUserWithStats>('/auth/userall');
            return data;        
        }
}

export default new StatService(axiosInstance);


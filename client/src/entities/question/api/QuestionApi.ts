import type { AxiosInstance, AxiosResponse } from "axios";
import { IQuestion} from "../model";
import { axiosInstance } from "@/shared/lib/axiosInstance";

class QuestionService {
  constructor(private readonly client: AxiosInstance) {}

  async getThemes(): Promise<IQuestion[]> {
    const { data } = await this.client<IQuestion[]>("/questions/themes");
    return data;
  }

  async addStatOfUser(score: number): Promise<AxiosResponse> {
    console.log(score)
    const { data } = await this.client.post("/stats/addStat", {score});
    return data;
  }

}
export default new QuestionService(axiosInstance);
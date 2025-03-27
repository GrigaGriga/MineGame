import type { AxiosInstance, AxiosResponse } from "axios";
import { IQuestion} from "../model";
import { axiosInstance } from "@/shared/lib/axiosInstance";

class QuestionService {
  constructor(private readonly client: AxiosInstance) {}

  async getQuestions(): Promise<IQuestion[]> {
    const { data } = await this.client<IQuestion[]>("/questions/questions");
    return data;
  }

  async getThemes(): Promise<IQuestion[]> {
    const { data } = await this.client<IQuestion[]>("/questions/themes");
    return data;
  }
  // async getFavouriteBooks(): Promise<IBook[]> {
  //   const { data } = await this.client<IBook[]>("/books/favourite");
  //   return data;
  // }

  // async getMyBooks(): Promise<IBook[]> {
  //   const { data } = await this.client<IBook[]>("/books/my");
  //   return data;
  // }

  // async likeBook(id: IBook["id"]): Promise<IBook> {
  //   const { data } = await this.client.post<IBook>(`/books/${id}/likeBook`);
  //   // console.log(data)
  //   return data;
  // }

  // async readBook(id: IBook["id"]): Promise<IBook> {
  //   const { data } = await this.client.post<IBook>(`/books/${id}/readBook`);
  //   // console.log(data)
  //   return data;
  // }

  // async addBook(book: IBookCreateData): Promise<IBook> {
  //   const { data } = await this.client.post<IBook>("/books/addbook", book);
  //   return data;
  // }

  // async deleteBook(id: IBook["id"]): Promise<AxiosResponse> {
  //   return this.client.delete<AxiosResponse>(`/books/${id}/delete`);
  // }
}
export default new QuestionService(axiosInstance);
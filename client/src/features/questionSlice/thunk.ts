import QuestionApi from '@/entities/question/api/QuestionApi';
import BookApi from '@/entities/question/api/QuestionApi';
import { IQuestion } from '@/entities/question/model';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadAllQuestionsThunk = createAsyncThunk('questions/loadAllQuestionsThunk', () =>
  QuestionApi.getQuestions(),
);

export const loadAllThemesThunk = createAsyncThunk('questions/loadAllThemesThunk', () =>
  QuestionApi.getThemes(),
);

// export const loadUserBooksThunk = createAsyncThunk('books/loadUserBooksThunk', () =>
//   BookApi.getMyBooks(),
// );

// export const loadFavouriteBooksThunk = createAsyncThunk('books/loadFavouriteBooksThunk', () =>
//   BookApi.getFavouriteBooks(),
// );

// export const addFavouriteThunk = createAsyncThunk(
//   'books/addFavouriteThunk',
//   async (bookId: IBook['id']) => {
//     const data = await BookApi.likeBook(bookId);
//     return { data, bookId };
//   },
// );

// export const addReadedThunk = createAsyncThunk(
//   'books/addReadedThunk',
//   async (bookId: IBook['id']) => {
//     const data = await BookApi.readBook(bookId);
//     return { data, bookId };
//   },
// );

// export const deleteBookThunk = createAsyncThunk(
//   'books/deleteBookThunk',
//   async (bookId: IBook['id']) => {
//     await BookApi.deleteBook(bookId);
//     return bookId;
//   },
// );

// export const addBookThunk = createAsyncThunk(
//   'books/addBookThunk',
//   async (formData: IBookCreateData) => {
//     // console.log(formData)
//     return BookApi.addBook(formData);
//   },
// );
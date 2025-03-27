import { IQuestion } from '@/entities/question/model';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  addBookThunk,
  addFavouriteThunk,
  addReadedThunk,
  deleteBookThunk,
  loadAllBooksThunk,
  loadAllQuestionsThunk,
  loadAllThemesThunk,
  loadFavouriteBooksThunk,
  loadUserBooksThunk,
} from './thunk';

export type QuestionState = {
  questions: IQuestion[];
  themes: IQuestion[];
  // sort: {
  //   key: 'order' | 'name';
  //   order: 'asc' | 'desc';
  // };
  // isLoadingBooks: boolean;
};

const initialState: QuestionState = {
  questions: [],
  themes:[],
  // sort: {
  //   key: 'order',
  //   order: 'asc',
  // },
  // isLoadingBooks: false,
};

// function applySort(state: BookState): void {
//   state.books = state.books.toSorted((a, b) => {
//     if (state.sort.key === 'order') {
//       return state.sort.order === 'asc'
//         ? Date.parse(a.createdAt) - Date.parse(b.createdAt)
//         : Date.parse(b.createdAt) - Date.parse(a.createdAt);
//     }
//     return state.sort.order === 'asc'
//       ? a.title.localeCompare(b.title)
//       : b.title.localeCompare(a.title);
//   });
// }

export const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    // changeSort: (state, action: PayloadAction<'order' | 'name'>) => {
    //   if (state.sort.key === action.payload) {
    //     state.sort.order = state.sort.order === 'asc' ? 'desc' : 'asc';
    //   } else {
    //     state.sort.key = action.payload;
    //     state.sort.order = 'asc';
    //   }
    //   applySort(state);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllQuestionsThunk.fulfilled, (state, action) => {
        state.questions = action.payload;
        // state.isLoadingBooks = false;
      })
      .addCase(loadAllThemesThunk.fulfilled, (state, action) => {
        state.themes = action.payload;
        // state.isLoadingBooks = false;
      })
      // .addCase(loadAllBooksThunk.pending, (state) => {
        // state.isLoadingBooks = true;
      // })
      // .addCase(loadAllBooksThunk.rejected, (state) => {
      //   state.isLoadingBooks = false;
      // })
  //     .addCase(loadUserBooksThunk.fulfilled, (state, action) => {
  //       state.usersBooks = action.payload;
  //       state.isLoadingBooks = false;
  //     })
  //     .addCase(loadUserBooksThunk.pending, (state) => {
  //       state.isLoadingBooks = true;
  //     })
  //     .addCase(loadUserBooksThunk.rejected, (state) => {
  //       state.isLoadingBooks = false;
  //     })
  //     .addCase(loadFavouriteBooksThunk.fulfilled, (state, action) => {
  //       state.likedUsersBooks = action.payload;
  //       state.isLoadingBooks = false;
  //     })
  //     .addCase(loadFavouriteBooksThunk.pending, (state) => {
  //       state.isLoadingBooks = true;
  //     })
  //     .addCase(loadFavouriteBooksThunk.rejected, (state) => {
  //       state.isLoadingBooks = false;
  //     })
  //     .addCase(addBookThunk.fulfilled, (state, action) => {
  //       state.usersBooks = [...state.usersBooks, action.payload];
  //       state.books = [...state.books, action.payload];
  //       state.isLoadingBooks = false;
  //     })
  //     .addCase(addBookThunk.pending, (state) => {
  //       state.isLoadingBooks = true;
  //     })
  //     .addCase(addBookThunk.rejected, (state) => {
  //       state.isLoadingBooks = false;
  //     })
  //     .addCase(deleteBookThunk.fulfilled, (state, action) => {
  //       const targetBook = state.books.find((book) => book.id === action.payload);
  //       if (!targetBook) return;
  //       state.books = state.books.filter((book) => book.id !== action.payload);
  //       state.usersBooks = state.usersBooks.filter((book) => book.id !== action.payload);
  //       state.likedUsersBooks = state.likedUsersBooks.filter((book) => book.id !== action.payload);
  //     })
  //     .addCase(addFavouriteThunk.fulfilled, (state, action) => {
  //       const targetBook = state.likedUsersBooks.find((book) => book.id === action.payload.bookId);

  //       if (!targetBook) {
  //         const newBook = { ...action.payload.data };
  //         for (let i = 0; i < state.books.length; i += 1) {
  //           if (state.books[i].id === action.payload.bookId) {
  //             state.books[i] = newBook;
  //           }
  //         }
  //         state.likedUsersBooks = [...state.likedUsersBooks, newBook];
  //         for (let i = 0; i < state.usersBooks.length; i += 1) {
  //           if (state.usersBooks[i].id === action.payload.bookId) {
  //             state.usersBooks[i] = newBook;
  //           }
  //         }
  //       } else {
  //         state.likedUsersBooks = state.likedUsersBooks.filter(
  //           (book) => book.id !== action.payload.bookId,
  //         );
  //         for (let i = 0; i < state.books.length; i += 1) {
  //           if (state.books[i].id === action.payload.bookId) {
  //             state.books[i] = action.payload.data;
  //           }
  //         }
  //         for (let i = 0; i < state.usersBooks.length; i += 1) {
  //           if (state.usersBooks[i].id === action.payload.bookId) {
  //             state.usersBooks[i] = action.payload.data;
  //           }
  //         }
  //       }
  //     })
  //     .addCase(addReadedThunk.fulfilled, (state, action) => {
  //       const newBook = { ...action.payload.data };
  //       state.books = [
  //         ...state.books.map((book) => (book.id === action.payload.bookId ? newBook : book)),
  //       ];
  //       state.likedUsersBooks = [
  //         ...state.likedUsersBooks.map((book) =>
  //           book.id === action.payload.bookId ? newBook : book,
  //         ),
  //       ];
  //       state.usersBooks = [
  //         ...state.usersBooks.map((book) => (book.id === action.payload.bookId ? newBook : book)),
  //       ];
  //     });
  },
});

// Action creators are generated for each case reducer function
// export const { changeSort } = bookSlice.actions;

export default questionSlice.reducer;

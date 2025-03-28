import { configureStore } from '@reduxjs/toolkit';
import questionReducer from '../features/questionSlice/slice';
import authReducer from '../features/auth/lib/authSlice';
import statsReducer from '../features/statSlice/slice';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    questions: questionReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
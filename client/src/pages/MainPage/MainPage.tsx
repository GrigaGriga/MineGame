import React from 'react';
import BookCard from '@/entities/question/ui/ThemeCard/ThemeCard';
// import { changeSort } from '@/features/questionSlice/slice';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { Box, Button, ButtonGroup, Paper } from '@mui/material';

export function MainPage(): React.JSX.Element {
  const books = useAppSelector((state) => state.books.books);
  const { key, order } = useAppSelector((store) => store.books.sort);
  const dispatch = useAppDispatch();

  return (
    <Paper elevation={0}>
      <ButtonGroup>
      </ButtonGroup>
      <Box mt={1} py={2} px={2} display="flex" flexDirection="row" flexWrap="wrap">
        {books.map((el) => (
          <Box p={1} key={el.id}>
            <BookCard book={el} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

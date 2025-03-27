import BookCard from "@/entities/book/ui/ProductCard/BookCard";
import { useAppSelector } from "@/shared/lib/reduxHooks";
import { Box, Paper } from "@mui/material";
import React from "react";

export function GamePage(): React.JSX.Element {

  // const questions = useAppSelector((state) => state.books.likedUsersBooks);

  return (
    <Paper elevation={0}>
      <Box
        mt={1}
        py={2}
        px={2}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >123
        {/* {questions.map((el) => (
          <Box p={1} key={el.id}>
            <BookCard book={el} 
            />
          </Box>
        ))} */}
      </Box>
    </Paper>
  );
}

import React, { CSSProperties } from 'react';
import { Button, Card, CardActions, CardContent,  Typography } from '@mui/material';
import {  IQuestion } from '../../model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';

const cardStyle: CSSProperties = {
  minWidth: 263,
  maxWidth: 355,
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};
type QuestionTypeProps = {
  question: IQuestion;
};

export default function ThemeCard({ question }: QuestionTypeProps): React.JSX.Element {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  // console.log(book)
  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="div">
          {question.question}
        </Typography>
      </CardContent>
      <CardActions>
          <Button size="small" 
          // onClick={() => dispatch(deleteBookThunk(book.id))}
          >
            Delete
          </Button>
      </CardActions>
    </Card>
  );
}

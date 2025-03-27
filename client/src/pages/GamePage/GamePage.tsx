import React from 'react';
import ThemeCard from '@/entities/question/ui/ThemeCard/ThemeCard';
import { useAppSelector } from '@/shared/lib/reduxHooks';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function GamePage(): React.JSX.Element {
  const questions = useAppSelector((state) => state.questions.questions);
  console.log(questions)
  const themes = useAppSelector((state) => state.questions.themes);
  console.log(themes)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Тема</TableCell>
            <TableCell align="right">200</TableCell>
            <TableCell align="right">400</TableCell>
            <TableCell align="right">600</TableCell>
            <TableCell align="right">800</TableCell>
            <TableCell align="right">1000</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {themes.map((theme) => (
            <TableRow
              key={theme.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {theme.title}
              </TableCell>
              {theme.Questions.map((question) => (<TableCell align="right">{question.question}</TableCell>))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // <Paper elevation={0}>
    //   <Box mt={1} py={2} px={2} display="flex" flexDirection="row" flexWrap="wrap">
    //     123
    //     {questions.map((el) => (
    //       <Box p={1} key={el.id}>
    //         <ThemeCard question={el} 
    //         />
    //       </Box>
    //     ))}
    //   </Box>
    // </Paper>
  );
}

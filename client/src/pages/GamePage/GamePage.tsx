import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/lib/reduxHooks';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IQuestion } from '@/entities/question/model';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function GamePage(): React.JSX.Element {
  const themes = useAppSelector((state) => state.questions.themes);


  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(60);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null); 
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const handleOpen = (question: IQuestion): void => {
      setSelectedQuestion(question); 
      setOpen(true);
      setTimer(60)
  };
  const handleClose = (): void => {
      setOpen(false);
      setSelectedQuestion(null);
      setTimer(60); 
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
  };

  useEffect(() => {
    if (open && selectedQuestion) {
        const id = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(id);
                    setIntervalId(null);
                    handleClose();
                    return 0;
                }
            });
        }, 1000);
        setIntervalId(id); 
    } else if (!open && intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
    }
    return () => {
      if (intervalId) {
          clearInterval(intervalId);
      }
  };
}, [open, selectedQuestion])

  return (
    <>
    <Modal
  open={open}
  // onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      {selectedQuestion?.question}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      <p>{selectedQuestion?.point}</p>
    <p>Время-{timer}</p>
    </Typography>
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    <Button onClick={handleClose} variant="outlined">Outlined</Button>
  </Box>
</Modal>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {themes.map((theme) => (
            <TableRow key={theme.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {theme.title}
              </TableCell>
              {theme.Questions.toSorted((a, b) => a.point - b.point).map((question) => (
                <TableCell align="right">
                  <Button onClick={()=>handleOpen(question)}>{question.point}</Button>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IQuestion } from '@/entities/question/model';
import { decrementScore, incrementScore, resetScore } from '@/features/questionSlice/slice';
import { addStatOfUserThunk, loadAllThemesThunk } from '@/features/questionSlice/thunk';

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
  const score = useAppSelector((state) => state.questions.score);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(null);
  const [timer, setTimer] = useState(60);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [answer, setAnswer] = useState('');
  const handleOpen = (question: IQuestion): void => {
    setSelectedQuestion(question);
    setOpen(true);
    setTimer(60);
  };
  const handleClose = (): void => {
    setOpen(false);
    setSelectedQuestion(null);
    setTimer(60);
    setAnswer('');
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleAnswerChange = (event: React.FormEvent<HTMLFormElement>) => {
    setAnswer(event.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>, question?: IQuestion): void => {
    e.preventDefault();
    if (
      question &&
      question.answer &&
      answer.trim().toLowerCase() === question.answer.trim().toLowerCase()
    ) {
      dispatch(incrementScore(question));
      console.log('Правильный ответ');
      setShow('show');
      setTimeout(() => {
        setShow(null);
        handleClose();
      }, 2000);
    } else {
      dispatch(decrementScore(question));
      // console.log(question)
      console.log('Неправильный ответ');
      setShow('noShow');
      setTimeout(() => {
        setShow(null);
        handleClose();
      }, 2000);
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
            dispatch(decrementScore(selectedQuestion));
            console.log('Время вышло');
            return 0;
          }
        });
      }, 1000);
      setIntervalId(id);
    } else if (!open && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return (): void => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [open, selectedQuestion]);

  useEffect(() => {
    const allQuestionsSolved = themes.every((theme) =>
      theme.Questions.every((question) => question.isSolved),
    );
    if (themes.length > 0 && allQuestionsSolved) {
      dispatch(addStatOfUserThunk(score)).then(() => {
        console.log('Конец игры');
        dispatch(loadAllThemesThunk());
        dispatch(resetScore());
      });
    }
  }, [themes]);

  return (
    <>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{ color: 'black' }} id="modal-modal-title" variant="h6" component="h2">
            {selectedQuestion?.question}
          </Typography>
          <Typography style={{ color: 'black' }} id="modal-modal-description" sx={{ mt: 2 }}>
            {/* {selectedQuestion?.point} */}
            Время на исходе-{timer}
          </Typography>
          <Box component="form" onSubmit={(e) => submitHandler(e, selectedQuestion)}>
            <TextField
              name="answer"
              label="Ваш ответ"
              type="text"
              id="outlined-basic"
              variant="outlined"
              value={answer}
              onChange={handleAnswerChange}
            />
            <Button variant="outlined" type="submit">
              Ответить
            </Button>
            <Typography style={{ color: 'black' }} id="modal-modal-description" sx={{ mt: 2 }}>
              {show === 'show' && 'ВЕРНО!'}
              {show === 'noShow' && 'МИМО!'}
            </Typography>
          </Box>
        </Box>
      </Modal>
      <Box
        style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.699', marginTop: '50px' }}
        component="section"
        sx={{ p: 2, borderBottom: '1px solid white' }}
      >
        Ваш счет: {score}
      </Box>
      <TableContainer
        style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.699' }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {themes.map((theme) => (
              <TableRow key={theme.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell style={{ color: 'white' }} component="th" scope="row">
                  {theme.title}
                </TableCell>
                {theme.Questions.toSorted((a, b) => a.point - b.point).map((question) => (
                  <TableCell key={question.id} align="right">
                    <Button
                      style={{
                        ...(question.isSolved && {
                          pointerEvents: 'none',
                          opacity: 0.3,
                          cursor: 'default',
                        }),
                      }}
                      onClick={() => handleOpen(question)}
                    >
                      {question.point}
                    </Button>
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

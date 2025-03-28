import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { IQuestion } from '@/entities/question/model';
import { decrementScore, incrementScore, resetScore } from '@/features/questionSlice/slice';
import { addStatOfUserThunk, loadAllThemesThunk } from '@/features/questionSlice/thunk';
import './GamePageStyles.css';

export function GamePage(): React.JSX.Element {
  const themes = useAppSelector((state) => state.questions.themes);
  const score = useAppSelector((state) => state.questions.score);
  const dispatch = useAppDispatch();


  const [num, setNum] = useState(0);
  const [open, setOpen] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
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
  const handleOpenEnd = (): void => {
    console.log('handleOpenEnd');
    setOpenEnd(true);
  };
  const handleCloseEnd = (): void => {
    setOpenEnd(false);
  };


  const handleAnswerChange = (event: React.FormEvent<HTMLFormElement>):void => {
    setAnswer(event.target.value);

  const submitHandler = (e: React.FormEvent, question?: IQuestion): void => {
    e.preventDefault();
    if (question && question.answer && answer.trim().toLowerCase() === question.answer.trim().toLowerCase()) {
      dispatch(incrementScore(question));
      setShow('show');
      setTimeout(() => {
        setShow(null);
        handleClose();
      }, 1500);
    } else {
      dispatch(decrementScore(question));
      setShow('noShow');
      setTimeout(() => {
        setShow(null);
        handleClose();
      }, 3000);
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
        dispatch(loadAllThemesThunk());
        setNum(score);
        dispatch(resetScore());
        handleOpenEnd();
      });
    }
  }, [themes]);

  return (

    <>
          <Modal
        open={openEnd}
        onClose={handleCloseEnd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{ color: 'black' }} id="modal-modal-title" variant="h6" component="h2">
            Конец Игры
          </Typography>
          <Typography style={{ color: 'black' }} id="modal-modal-description" sx={{ mt: 2 }}>
            Итоговый счет: {num}
          </Typography>
            <Button variant="outlined" onClick={handleCloseEnd}>
              УРА
            </Button>
        </Box>
      </Modal>
      
      
      
<!--       <Modal
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
              // onChange={handleAnswerChange}
            />
            <Button variant="outlined" type="submit">
              Ответить
            </Button>
            <Typography style={{ color: 'black' }} id="modal-modal-description" sx={{ mt: 2 }}>
              {show === 'show' && 'ВЕРНО!'}
              {show === 'noShow' && `МИМО! Верный ответ: ${selectedQuestion?.answer}`}
            </Typography>
          </Box>
        </Box>
      </Modal> -->
      
<!--       <Box
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
                      // onClick={handleOpenEnd}
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
      </TableContainer> -->


    <div className="game-container">
      {/* Score display */}
      <div className="game-score">
        Ваш счет: <span className="score-value">{score}</span>
      </div>

      {/* Game board */}
      <div className="game-board">
        {themes.map((theme) => (
          <div key={theme.id} className="theme-row">
            <div className="theme-title">{theme.title}</div>
            <div className="questions-container">
              {theme.Questions.toSorted((a, b) => a.point - b.point).map((question) => (
                <button
                  key={question.id}
                  className={`question-button ${question.isSolved ? 'solved' : ''}`}
                  onClick={() => !question.isSolved && handleOpen(question)}
                >
                  {question.point}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for questions */}
      {open && selectedQuestion && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-question">{selectedQuestion.question}</h3>
              <div className="modal-timer">Время на исходе-{timer} сек</div>
            </div>
            
            <form onSubmit={(e) => submitHandler(e, selectedQuestion)} className="modal-form">
              <input
                type="text"
                className="modal-input"
                value={answer}
                onChange={handleAnswerChange}
                placeholder="Ваш ответ"
                autoFocus
              />
              <button type="submit" className="modal-submit">Ответить</button>
            </form>

            {show && (
              <div className={`modal-feedback ${show === 'show' ? 'correct' : 'incorrect'}`}>
                {show === 'show' ? 'ВЕРНО!' : `МИМО! Верный ответ: ${selectedQuestion?.answer}`}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
</>
  );
}
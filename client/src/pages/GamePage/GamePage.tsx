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

  const handleAnswerChange = (event: React.FormEvent<HTMLFormElement>): void => {
    setAnswer(event.target.value);
  };

  const submitHandler = (e: React.FormEvent, question?: IQuestion): void => {
    e.preventDefault();
    if (
      question &&
      question.answer &&
      answer.trim().toLowerCase() === question.answer.trim().toLowerCase()
    ) {
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
      {openEnd && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-question">Конец Игры</h3>
            </div>
            <div className="modal-header">
              <h2 className="modal-question">Итоговый счет: {num}</h2>
            </div>
            <button onClick={handleCloseEnd} className="question-button">
              УРА
            </button>
          </div>
        </div>
      )}

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
                <button type="submit" className="modal-submit">
                  Ответить
                </button>
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

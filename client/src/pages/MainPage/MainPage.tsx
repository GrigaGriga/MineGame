import React from "react";
import BookCard from "@/entities/book/ui/ProductCard/BookCard";
import { changeSort } from "@/features/bookSlice/slice";
import {  useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";
import { Box, Button, ButtonGroup, Paper } from "@mui/material";
import "./mainPageStyle.css";
import { useNavigate } from "react-router-dom";


export function MainPage(): React.JSX.Element {
const navigate = useNavigate();
const books = useAppSelector((state) => state.books.books);
  const { key, order } = useAppSelector((store) => store.books.sort);
  const dispatch = useAppDispatch();

  return (
    <div className="welcome-page">
      <h1>СВОЯ ИГРА</h1>
      <h3>Прежде чем начать игру, ознакомься с правилами:</h3>
      <ol>
        <li>Игра начнётся после нажатия на кнопку "Начать игру"</li>
        <li>Вы можете выбрать любой вопрос из любой категории</li>
        <li>У каждого вопроса своя стоимость</li>
        <li>У вас будет 60 секунд для того чтобы ответить на вопрос</li>
        <li>Если ответ верный, ты получаешь баллы эквивалентные стоимости вопроса</li>
        <li>Если ответ неправильный, ты теряешь баллы эквивалентные стоимости вопроса</li>
        <li>Если время закончилось, ты теряешь баллы эквивалентные стоимости вопроса</li>
      </ol>
      <Button onClick={() => navigate("/game")} className="start-button" variant="contained" color="primary">Начать игру</Button>
    </div>
  );
}

import React from "react";
import "./mainPageStyle.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/shared/lib/reduxHooks";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { AuthStatus } from "@/entities/user/model";

export function MainPage(): React.JSX.Element {
  const status = useAppSelector((state) => state.auth.status);
const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <h1>СВОЯ ИГРА</h1>
      <h3>Прежде чем начать игру, ознакомься с правилами:</h3>
      {status === AuthStatus.AUTHORIZED ? <button onClick={() => navigate(CLIENT_ROUTES.GAME)} className="start-button" >Начать игру</button> : <button onClick={() => navigate(CLIENT_ROUTES.LOGIN)} className="start-button" >Войти</button>}
      
      <ol>
        <li>Игра начнётся после нажатия на кнопку "Начать игру"</li>
        <li>Вы можете выбрать любой вопрос из любой категории</li>
        <li>У каждого вопроса своя стоимость</li>
        <li>У вас будет 60 секунд для того чтобы ответить на вопрос</li>
        <li>Если ответ верный, ты получаешь баллы эквивалентные стоимости вопроса</li>
        <li>Если ответ неправильный, ты теряешь баллы эквивалентные стоимости вопроса</li>
        <li>Если время закончилось, ты теряешь баллы эквивалентные стоимости вопроса</li>
      </ol>
      
    </div>
  );
}

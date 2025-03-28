import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/shared/lib/reduxHooks';
import { loadAllQuestionsThunk } from '../../features/questionSlice/thunk';
import { loginThunk } from '@/features/auth/lib/thunks';
import type { IUserLoginData } from '@/entities/user/model';
import './LoginForm.css';

export default function LoginForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: IUserLoginData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    dispatch(loginThunk(data)).then(() => {
      dispatch(loadAllQuestionsThunk());
      navigate('/');
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={loginHandler}>
        {/* Neon border elements */}
        <div className="neon-border-bottom"></div>
        <div className="neon-border-left"></div>
        
        <h1 className="login-title">Вход</h1>
        
        <div className="input-group">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            className="login-input"
            required
          />
          <div className="input-underline"></div>
        </div>
        
        <div className="input-group">
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            className="login-input"
            required
          />
          <div className="input-underline"></div>
        </div>
        
        <button type="submit" className="login-button">
          Войти
        </button>
      </form>
    </div>
  );
}
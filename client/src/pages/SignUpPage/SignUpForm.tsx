import React from 'react';
import { useNavigate } from 'react-router';
import { IUserSignUpData } from '@/entities/user/model';
import { signupThunk } from '@/features/auth/lib/thunks';
import { useAppDispatch } from '@/shared/lib/reduxHooks';
import { loadAllQuestionsThunk } from '@/features/questionSlice/thunk';
import './SignUpFormStyles.css';

export default function SignUpForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: IUserSignUpData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    void dispatch(signupThunk(data)).then(() => {
      dispatch(loadAllQuestionsThunk());
      navigate('/');
    });
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submitHandler}>
        {/* Neon border elements */}
        <div className="neon-border-bottom"></div>
        <div className="neon-border-left"></div>
        
        <h1 className="auth-title">Регистрация</h1>
        
        <div className="input-group">
          <input 
            type="text" 
            name="name" 
            placeholder="Имя" 
            className="form-input"
            required
          />
          <div className="input-underline"></div>
        </div>
        
        <div className="input-group">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            className="form-input"
            required
          />
          <div className="input-underline"></div>
        </div>
        
        <div className="input-group">
          <input 
            type="password" 
            name="password" 
            placeholder="Пароль" 
            className="form-input"
            required
          />
          <div className="input-underline"></div>
        </div>
        
        <button type="submit" className="auth-button">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
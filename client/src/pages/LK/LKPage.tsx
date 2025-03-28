import React, { useEffect, useState } from 'react';
import './LKstyles.css';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';

interface Game {
  id: number;
  createdAt: string;
  points: number;
}

export default function LKPage(): React.JSX.Element {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState('');
  const [games, setGames] = useState<Game[]>([]);


  // Рандомное фото пользователя
  useEffect(() => {
    const photos = [
      '/public/avatars/11.jpg',
      '/public/avatars/22.jpg',
      '/public/avatars/33.jpg',
      '/public/avatars/44.jpg',
      '/public/avatars/55.jpg',
    ];
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    setPhoto(randomPhoto);
  }, []);

  useEffect(() => {
    const userGames = async () => {
      const response = await axiosInstance.get('/stats/usergames');
      setGames(response.data);
    };
    userGames();
  }, []);

  return (
    <div className="lk-container">
      <div className="lk-header">
        <h1>Личный кабинет</h1>
      </div>
      
      <div className="lk-profile">
        <div className="avatar-frame">
          <img src={photo} alt="Аватар" className="avatar" />
        </div>
        <h2 className="username">{user?.name}</h2>
      </div>

      <div className="lk-games">
        <h3>Мои игры:</h3>
        <div className="games-scroll-container">
          {games.length > 0 ? (
            <table className="games-table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Счет</th>
                </tr>
              </thead>
              <tbody>
                {games.toSorted((a, b) => b.points - a.points).map(game => (
                  <tr key={game.id}>
                    <td>{game.createdAt.split('T')[0]}</td>
                    <td>{game.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-games-message">У вас пока нет сыгранных игр</p>
          )}
        </div>
      </div>
    </div>
  );
}
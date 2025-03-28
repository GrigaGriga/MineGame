import React, { useEffect } from 'react';
import { loadStatThunk } from '../../features/statSlice/thunk';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import './StatsPageStyles.css';


export default function StatsPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.stats.stat);

  useEffect(() => {
    dispatch(loadStatThunk());
  }, [dispatch]);

  const flattenedStats = users.flatMap((user) =>
    user.Stats.map((stat) => ({
      name: user.name,
      points: stat.points,
      id: stat.id,
    }))
  );

  const handleDownload = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `http://localhost:3000/api/stats/download`;
  };

  const sortedStats = [...flattenedStats].sort((a, b) => b.points - a.points);

  return (
    <div className="stats-container">
      <h1 className="stats-header">МАГИСТРЫ</h1>
      
      <div className="trophy-section">
        <img src="./kybok.png" alt="Champion Trophy" className="trophy-image" />
        <div className="trophy-glow"></div>
      </div>
      <button className="download-button" onClick={handleDownload}>Скачать статистику</button>
      <div className="stats-scroll-container">
        <table className="stats-table">
          <thead>
            <tr>
              <th>ИГРОК</th>
              <th>ОЧКИ</th>
            </tr>
          </thead>
          <tbody>
            {sortedStats?.map(({ id, name, points }) => (
              <tr key={id}>
                <td>
                  {/* {index === 0 && '🏆 '} */}
                  {/* {index === 1 && '🥈 '}
                  {index === 2 && '🥉 '} */}
                  {name}
                </td>
                <td>{points.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
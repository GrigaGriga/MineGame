import React, { useEffect } from 'react';
import { loadStatThunk } from '../../features/statSlice/thunk';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';

export default function StatsPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.stats.stat); // теперь stat — это список пользователей

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

  console.log(users)

  // Сортировка по убыванию points
  const sortedStats = [...flattenedStats].sort((a, b) => b.points - a.points);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Stats Page</h2>

      <table border={1} cellPadding={10} cellSpacing={0} style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Points (↓)</th>
          </tr>
        </thead>
        <tbody>
          {sortedStats.map(({ id, name, points }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
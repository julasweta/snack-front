import React, {useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { snackActions } from '../redux/slices/SnackSlice';
import { RootState } from '../redux/store';



const UserScores: React.FC = () => {

  const dispatch = useAppDispatch();
  const { users, isGameOver } = useAppSelector((state: RootState) => state.snack);

  useEffect(() => {
    dispatch(snackActions.getAllUsers());
  }, [isGameOver]);

  return (
    <div>
      <h1>User Scores</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((userScore, index) => (
            <tr key={index}>
              <td className="name">{userScore.name}</td>
              <td>  {userScore.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserScores;

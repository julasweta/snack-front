import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../routing/AppRoutes';

const LoginForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (): void => {
    localStorage.setItem('userName', name);
    navigate('/' + AppRoutes.GAME);
  };


  return (
    <div className="box">
      <h1>Enter your name</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Start Game</button>
    </div>
  );
};

export default LoginForm;

import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./../App.css";
import UserScores from "../components/UserScore";
import { AppRoutes } from "../routing/AppRoutes";

const MainLayout: FC = () => {
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();


  //перевірка чи введено ім'я користувача
  useEffect(() => {
    if (!userName) {
      navigate('/' + AppRoutes.LOGIN);
    }
    else {
      navigate('/' + AppRoutes.GAME);
    }
  }, [userName, navigate]);


  return (
    <div>
      {userName ? (<h1 className="greeting">Hi, {userName}</h1>) : ''}

      <div className="main">
        <Outlet />
        <UserScores />
      </div>
    </div>
  );
};

export { MainLayout };
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "./../routing/AppRoutes";

const Error404 = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(AppRoutes.LOGIN);
  };

  const currentUrl = window.location.href;
  console.log(currentUrl); 

  return (
    <div>
      <h2>This page Not Found</h2>
      <button onClick={handleButtonClick}>Navigate</button>
    </div>
  );
};

export default Error404;
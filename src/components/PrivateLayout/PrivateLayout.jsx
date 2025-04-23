import { Outlet, useLocation } from "react-router-dom";
import MyAppBar from "../AppBar/AppBar";

const PrivateLayout = () => {
  const location = useLocation();

  // Rotas onde NÃO é para exibir a AppBar
  const hiddenAppBarRoutes = ["/Dashboard"];
  const hideAppBar = hiddenAppBarRoutes.includes(location.pathname);

  return (
    <>
      {!hideAppBar && <MyAppBar />}
      
      <div style={{width:'100%'}}>
        {!hideAppBar && <div style={{height:64, width:'100%'}} />}
        <Outlet />
      </div>
    </>
  );
};

export default PrivateLayout;

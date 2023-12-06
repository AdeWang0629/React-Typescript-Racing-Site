import React, { useEffect, useState } from 'react';
import './App.css';
import AppRoutes from './routes/routes';
import { useCookies } from 'react-cookie';
import { getUserToken } from './routes/helpers';
import { useDispatch } from 'react-redux';
import actions from './redux/Auth/actions';

const App = () => {
  const [cookies] = useCookies(['usertoken']);
  const dispatch = useDispatch();

  const [role, setRole] = useState(cookies.usertoken ? cookies.usertoken.role * 1 : 0);
  const [isAuthenticated, setIsAuthenticated] = useState(cookies.usertoken ? true : false);

  useEffect(() => {
    if (!cookies.usertoken) {
      setIsAuthenticated(false);
    }else{
      const data = getUserToken();

      dispatch({
        type: actions.SAVE_USERDATA,
        payload: data
      });
      
      setIsAuthenticated(true);
    }
  }, [cookies]);

  return <AppRoutes isAuthenticated={isAuthenticated} role={role} />
}

export default App;

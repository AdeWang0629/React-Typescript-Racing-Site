import React, { useEffect, useState } from 'react';
import AppRoutes from './routes/routes';
import { useCookies } from 'react-cookie';
import { getUserToken } from './routes/helpers';
import { useDispatch } from 'react-redux';
import actions from './redux/Auth/actions';

import 'semantic-ui-css/semantic.min.css'

import './App.css';

import { ToastContainer } from 'react-toastify';

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
      
      setRole(cookies.usertoken.role * 1);
      setIsAuthenticated(true);
    }
  }, [cookies]);

  return (
    <div>
      <AppRoutes isAuthenticated={isAuthenticated} role={role} />   
      <ToastContainer />
    </div>
  )
}

export default App;

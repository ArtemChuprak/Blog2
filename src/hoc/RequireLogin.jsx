import React from 'react';
import {  useSelector } from 'react-redux';

import { useLocation, Navigate } from 'react-router-dom';
import { selectUser } from '../store/selectors';

function RequireLogin({ children }) {
  const location = useLocation();

  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return children;
}

export default RequireLogin;
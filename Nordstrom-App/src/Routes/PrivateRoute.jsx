import React from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext/AuthContext';

function PrivateRoute({children}) {
const {authState} = React.useContext(AuthContext);

if(!authState.authStatus)
{
    return <Navigate to="/register" />
}

  return children;
}

export default PrivateRoute

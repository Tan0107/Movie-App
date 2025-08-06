import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const RequiredAdmin = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user?.isAdmin) return <Navigate to="/" />;
  return children;
};

export default RequiredAdmin;

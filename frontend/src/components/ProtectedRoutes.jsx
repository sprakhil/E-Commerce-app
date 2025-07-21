import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  
  // Replace `userInfo` with your actual logic for checking authentication
  // For example, you might check for a token in localStorage or a user object in Redux state.
  
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
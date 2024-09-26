import { useNavigate } from 'react-router-dom';

const useGoBackOnePath = () => {
  const navigate = useNavigate();

  const goBackOnePath = () => {
    const currentPath = window.location.pathname;  // Get the current path
    const newPath = currentPath.split('/').slice(0, -1).join('/');  // Remove the last segment
    navigate(newPath);  // Navigate to the new path
  };

  return goBackOnePath;
};

export default useGoBackOnePath;
import { useMemo } from 'react';
import { useParams, useLocation, useNavigate, useMatch } from 'react-router-dom';

export default function useRouter() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const match = useMatch;

  return useMemo(() => ({
    params,
    location,
    navigate,
    match,
    pathname: location.pathname
  }), [params, location, navigate])
}
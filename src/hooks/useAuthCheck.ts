import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAuthStatus } from "@selectors";

import useRouter from "./useRouter";

function useAuthCheck(reverse?: boolean) {
  const { navigate } = useRouter();
  const isAuth = useSelector(getAuthStatus);
  useEffect(() => {
    if (!isAuth) navigate('/signin');
    if (reverse && isAuth) navigate('/');
  }, [isAuth])
}

export default useAuthCheck;
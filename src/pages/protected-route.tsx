import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement, useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from '..';
import { getUser } from '../services/actions/profile';
import { TStore } from '../utils/types';



type TProtectedRoute = {
  element: ReactElement;
  needAuth?: boolean;
}

const ProtectedRoute: FC<TProtectedRoute> = ({ element, needAuth=true }) => {
    const dispatch: any = useDispatch()
    const getLoggedIn = (store: TStore) => store.profile.loggedIn;
    const loggedIn = useSelector(getLoggedIn);
    const [userWillBeLoaded, setUserWillBeLoaded] = useState<boolean>(true)
    const location = useLocation()


    useEffect(() => {
      if (!loggedIn) {
        dispatch(getUser({onFinish: () => setUserWillBeLoaded(false)}))
      }
    }, [loggedIn]);

    if (!loggedIn && userWillBeLoaded) return <></>
    if (!needAuth) {
      const {wasReset, loginReferer, ...rest} = location.state || {}
      return !loggedIn ? element : <Navigate 
                                       to={loginReferer || '/'}
                                       replace={true}
                                       state={rest} />;
    } else {
      return loggedIn ? element : <Navigate 
                                      to="/login" 
                                      replace={true} 
                                      state={{...location.state, 
                                              'loginReferer': location.pathname}}/>;
    }
}

export default ProtectedRoute;
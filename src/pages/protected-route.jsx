import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../services/actions/profile';


export function ProtectedRoute({ element, needAuth=true }) {
    const dispatch = useDispatch()
    const getLoggedIn = (store) => store.profile['loggedIn'];
    const loggedIn = useSelector(getLoggedIn);
    const [userWillBeLoaded, setUserWillBeLoaded] = useState(true)
    const location = useLocation()
    
  
    useEffect(() => {
      if (!loggedIn) {
        dispatch(getUser({onFinish: () => setUserWillBeLoaded(false)}))
      }
    }, [loggedIn]);

    if (!loggedIn && userWillBeLoaded) return
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
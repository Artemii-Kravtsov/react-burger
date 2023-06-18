import style from './index.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logIn } from '../../services/actions/profile';


const LoginPage = () => {
    const getLoggedIn = (store) => store.profile['loggedIn'];
    const loggedIn = useSelector(getLoggedIn);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inProcess, setInProcess] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState()
    const loginReferer = (location.state && location.state.loginReferer) || '/'

    const clearError = () => error && setError()
    useEffect(clearError, [email, password])

    function onError(promise) {
        if (!promise.json) return
        promise.json().then((body) => setError(body['message']))
    }

    function onSuccess() {
        const {wasReset, loginReferer, ...rest} = location.state || {}
        navigate(loginReferer, {state: rest, replace: true})
    }
    
    function onClick() {
        setInProcess(true)
        dispatch(logIn(email, 
                       password, 
                       {onSuccess,
                        onFinish: ()=>setInProcess(false),
                        onError}))
    }

    return (
      <div className={style.loginContainer}>
          <h3 className={`text text_type_main-large mb-6`}>Вход</h3>
          <EmailInput
              onChange={e => setEmail(e.target.value)}
              value={email}
              name={'email'}
              isIcon={false}
              error={error !== undefined}
              errorText={error}
              extraClass="mb-6"
              />
          <PasswordInput
              placeholder={'Пароль'}
              onChange={e => setPassword(e.target.value)}
              value={password}
              name={'password'}
              error={error !== undefined}
              errorText={error}
              extraClass="mb-6"
              />
          <Button 
              htmlType="button" 
              type="primary" 
              size="large" 
              extraClass={'mb-20'} 
              width="36" 
              height="36"
              disabled={!(email && password)}
              onClick={onClick}>
              {inProcess ? "Вход..." : "Войти"}
          </Button>
  
          <p className={"text_color_inactive text text_type_main-small mb-4"}>
              <span>Вы – новый пользователь? </span>
              <Link 
                  to='/register' 
                  replace={true}
                  state={{...location.state, 
                          loginReferer}}
                  className={style.link}>
                  Зарегистрироваться
              </Link>
          </p>
          <p className={"text_color_inactive text text_type_main-small"}>
              <span>Забыли пароль? </span>
              <Link 
                  to='/forgot-password'
                  replace={true}
                  state={{...location.state, 
                          loginReferer}}
                  className={style.link}>
                  Восстановить пароль
              </Link>
          </p>
      </div>
    )
}


export default LoginPage;
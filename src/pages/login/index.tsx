import style from './index.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logIn } from '../../services/actions/profile';
import { TStore, TBlindFunction } from '../../utils/types';


const LoginPage: FC = () => {
    const getLoggedIn = (store: TStore): boolean => store.profile['loggedIn'];
    const loggedIn = useSelector(getLoggedIn);
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [inProcess, setInProcess] = useState<boolean>(false)
    const dispatch: any = useDispatch()  // отключаю проверку экшена
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState<string | undefined>()
    const loginReferer = (location.state && location.state.loginReferer) || '/'

    const clearError: TBlindFunction = () => error && setError(undefined)
    useEffect(clearError, [email, password])

    function onError(error: any): void {
        if (error instanceof Error) setError('Неизвестная ошибка')
        if ((error instanceof Object) && (Object.keys(error).includes('message'))) {
            setError(error['message'])
        }
    }

    function onSuccess(): void {
        const {wasReset, loginReferer, ...rest} = location.state || {}
        navigate(loginReferer, {state: rest, replace: true})
    }
    
    function onClick(): void {
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
          <Input
              type="email"
              placeholder={'E-mail'}
              onChange={e => setEmail(e.target.value)}
              value={email}
              name={'email'}
              error={error !== undefined}
              errorText={error}
              extraClass="mb-6"
              />
          <Input
              type="password"
              placeholder={'Пароль'}
              onChange={e => setPassword(e.target.value)}
              value={password}
              name={'password'}
              error={(error !== undefined)}
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
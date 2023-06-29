import style from './index.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { customFetch } from '../../utils/customFetch';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { BASE_URL } from '../../services/constants';
import { TBlindFunction } from '../../utils/types';


const ResetPasswordPage: FC = () => {
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [inProcess, setInProcess] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | undefined>()
  const loginReferer = (location.state && location.state.loginReferer) || '/'
  const wasReset = (location.state && location.state.wasReset) || false

  const clearError: TBlindFunction = () => error && setError(undefined)
  useEffect(clearError, [code, password])

  
  function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setInProcess(true)
    customFetch(BASE_URL + 'password-reset/reset', {
        method: 'post',
        body: JSON.stringify({password, 'token': code}),
        onFinish: () => setInProcess(false),
        onError: (error) => {
            if (error instanceof Error) setError('Неизвестная ошибка')
            if ((error instanceof Object) && (Object.keys(error).includes('message'))) {
                setError(error['message'])
            }
        }, 
        onSuccess: () => navigate(loginReferer, {state: location.state, replace: true}),
        withRefresh: true})
  }


  if (!wasReset) return <Navigate to='/forgot-password' replace={true} state={location.state} />
  return (
    <div className={style.container}>
        <h3 className={`text text_type_main-large mb-6`}>Восстановление пароля</h3>
        <form onSubmit={resetPassword}
              className={style.form} >
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={e => setPassword(e.target.value)}
            value={password}
            name={'password'}
            error={error !== undefined}
            errorText={error}
            extraClass="mb-6"
            />
          <Input
            onChange={e => setCode(e.target.value)}
            type={'text'}
            placeholder={'Введите код из письма'}
            value={code}
            name={'code'}
            error={error !== undefined}
            errorText={error}
            extraClass="mb-6"
            />            
          <Button 
            htmlType="submit" 
            type="primary" 
            size="large" 
            extraClass={'mb-20'} 
            width="36" 
            height="36"
            disabled={!(password && code)}>
            {inProcess ? "Проверяем..." : "Сохранить"}
          </Button>
        </form>

        <p className={"text_color_inactive text text_type_main-small mb-4"}>
          <span>Вспомнили пароль? </span>
          <Link 
            to='/login'
            replace={true}
            state={{...location.state, 
                    loginReferer}}
            className={style.link}>
            Войти
          </Link>
        </p>
    </div>
  )
}

export default ResetPasswordPage;
import style from './index.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWithRefresh } from '../../utils/fetch-with-refresh';
import { afterFetch } from '../../utils/after-fetch';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { BASE_URL } from '../../services/constants';


const ResetPasswordPage = ({  }) => {
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [inProcess, setInProcess] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState()
  const loginReferer = (location.state && location.state.loginReferer) || '/'
  const wasReset = (location.state && location.state.wasReset) || false

  const clearError = () => error && setError()
  useEffect(clearError, [code, password])

  function onError(promise) {
      if (!promise.json) return
      promise.json().then((body) => setError(body['message']))
  }

  function reset() {
    setInProcess(true)
    const promise = fetchWithRefresh(BASE_URL + 'password-reset/reset', {
        method: 'post',
        body: JSON.stringify({password, 'token': code}),
        headers: {'Accept': 'application/json', 
                  'Content-Type': 'application/json'}
    })
    afterFetch(promise, 
               {onFinish: () => setInProcess(false),
                onError: onError, 
                onSuccess: () => navigate(loginReferer, {state: location.state, replace: true})})
  }

  if (!wasReset) return <Navigate to='/forgot-password' replace={true} state={location.state} />
  return (
    <div className={style.container}>
        <h3 className={`text text_type_main-large mb-6`}>Восстановление пароля</h3>
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
          htmlType="button" 
          type="primary" 
          size="large" 
          extraClass={'mb-20'} 
          width="36" 
          height="36"
          disabled={!(password && code)}
          onClick={reset}>
          {inProcess ? "Проверяем..." : "Сохранить"}
        </Button>

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

ResetPasswordPage.propTypes = {
}

export default ResetPasswordPage;
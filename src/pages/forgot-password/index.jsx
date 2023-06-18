import style from './index.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWithRefresh } from '../../utils/fetch-with-refresh';
import { afterFetch } from '../../utils/after-fetch';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../services/constants';

const ForgotPasswordPage = ({  }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [inProcess, setInProcess] = useState(false)
  const [error, setError] = useState()

  const clearError = () => error && setError()
  useEffect(clearError, [email])

  function onError(body) {
    setError(body['message'])
  }

  function resetPassword(event) {
    event.preventDefault()
    setInProcess(true)
    const promise = fetchWithRefresh(BASE_URL + 'password-reset', {
        method: 'post',
        body: JSON.stringify({email}),
        headers: {'Accept': 'application/json', 
                  'Content-Type': 'application/json'}
    })
    afterFetch(promise, 
               {onFinish: () => setInProcess(false),
                onError: onError, 
                onSuccess: () => navigate('/reset-password', {reset: true, 
                                                              state: {...location.state, 
                                                                      'wasReset': true}})})
  }

  return (
    <div className={style.container}>
        <h3 className={`text text_type_main-large mb-6`}>Восстановление пароля</h3>
        <form onSubmit={resetPassword}
              className={style.form} >
          <EmailInput
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder={'Укажите e-mail'}
              name={'email'}
              isIcon={false}
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
              disabled={!email}>
              {inProcess ? "Проверяем..." : "Восстановить"}
          </Button>
        </form>

        <p className={"text_color_inactive text text_type_main-small mb-4"}>
            <span>Вспомнили пароль? </span>
            <Link 
                to='/login' 
                replace={true}
                state={location.state}
                className={style.link}>
                Войти
            </Link>
        </p>
    </div>
  )
}

export default ForgotPasswordPage;
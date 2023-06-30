import style from './index.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { customFetch } from '../../utils/customFetch';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../services/constants';


const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState<string>('')
  const [inProcess, setInProcess] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()


  const clearError = (): void => {error && setError(undefined)}
  useEffect(clearError, [email])


  function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setInProcess(true)
    customFetch(BASE_URL + 'password-reset', {
        method: 'post',
        body: JSON.stringify({email}),
        onFinish: () => setInProcess(false),
        onError: (body) => setError(body['message']), 
        onSuccess: () => navigate('/reset-password', {replace: true, 
                                                      state: {...location.state, 
                                                              'wasReset': true}})})
  }


  return (
    <div className={style.container}>
        <h3 className={`text text_type_main-large mb-6`}>Восстановление пароля</h3>
        <form onSubmit={resetPassword}
              className={style.form} >
          <Input
              type='email'
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder={'Укажите e-mail'}
              name={'email'}
              // isIcon={false}
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
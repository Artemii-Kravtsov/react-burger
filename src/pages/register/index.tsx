import style from './index.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FormEvent, FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../services/actions/profile';
import { useLocation, useNavigate } from 'react-router-dom';
import { TBlindFunction } from '../../utils/types';


const RegisterPage: FC = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [inProcess, setInProcess] = useState<boolean>(false) 
    const [error, setError] = useState<string | undefined>()

    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const loginReferer = (location.state && location.state.loginReferer) || '/'

    const clearError: TBlindFunction = () => error && setError(undefined)
    useEffect(clearError, [name, email, password])

    function onError(error: any): void {
        if (error instanceof Error) setError('Неизвестная ошибка')
        if ((error instanceof Object) && (Object.keys(error).includes('message'))) {
            setError(error['message'])
        }
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setInProcess(true)
        dispatch(register({name, 
                           email, 
                           password}, 
                          {onSuccess: ()=>navigate(loginReferer, {replace: true}),
                           onFinish: ()=>setInProcess(false), 
                           onError: onError}))
    }

    return (
      <div className={style.registerContainer}>
          <h3 className={`text text_type_main-large mb-6`}>Регистрация</h3>
          <form onSubmit={onSubmit}
                className={style.form} >
            <Input
                onChange={e => setName(e.target.value)}
                type={'text'}
                placeholder={'Имя'}
                value={name}
                name={'name'}
                extraClass="mb-6"
            />
            <Input
                type='email'
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={'email'}
                error={error !== undefined}
                errorText={error}
                extraClass="mb-6"
                />
            <PasswordInput
                placeholder={'Пароль'}
                onChange={e => setPassword(e.target.value)}
                value={password}
                name={'password'}
                extraClass="mb-6"
                />
            <Button 
                htmlType="submit" 
                type="primary" 
                size="large" 
                extraClass={'mb-20'} 
                width="36" 
                height="36"
                disabled={!(name && email && password)}>
                {inProcess ? "Регистрируем..." : "Зарегистрироваться"}
            </Button>
          </form>
  
          <p className={"text_color_inactive text text_type_main-small mb-4"}>
              <span>Уже зарегистрированы? </span>
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

export default RegisterPage;
import style from './index.module.css';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../services/actions/profile';
import { useLocation, useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inProcess, setInProcess] = useState(false) 
    const [error, setError] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const loginReferer = (location.state && location.state.loginReferer) || '/'

    const clearError = () => error && setError()
    useEffect(clearError, [name, email, password])

    function onError(promise) {
        if (!promise.json) return
        promise.json().then((body) => setError(body['message']))
    }
    
    function onClick() {
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
          <Input
            onChange={e => setName(e.target.value)}
            type={'text'}
            placeholder={'Имя'}
            value={name}
            name={'name'}
            extraClass="mb-6"
          />
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
              extraClass="mb-6"
              />
          <Button 
              htmlType="button" 
              type="primary" 
              size="large" 
              extraClass={'mb-20'} 
              width="36" 
              height="36"
              disabled={!(name && email && password)}
              onClick={onClick}>
              {inProcess ? "Регистрируем..." : "Зарегистрироваться"}
          </Button>
  
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
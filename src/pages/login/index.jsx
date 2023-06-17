import style from './index.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';



const LoginPage = ({  }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


  return (
    <div className={style.loginContainer}>
        <h3 className={`text text_type_main-large mb-6`}>Вход</h3>
        <EmailInput
            onChange={e => setEmail(e.target.value)}
            value={email}
            name={'email'}
            isIcon={false}
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
            disabled={!(email && password)}
            onClick={() => undefined}>
            Войти
        </Button>

        <p className={"text_color_inactive text text_type_main-small mb-4"}>
            <span>Вы – новый пользователь? </span>
            <Link 
                to='/register' 
                className={style.link}>
                Зарегистрироваться
            </Link>
        </p>
        <p className={"text_color_inactive text text_type_main-small"}>
            <span>Забыли пароль? </span>
            <Link 
                to='/forgot-password' 
                className={style.link}>
                Восстановить пароль
            </Link>
        </p>
    </div>
  )
}

LoginPage.propTypes = {
}

export default LoginPage;
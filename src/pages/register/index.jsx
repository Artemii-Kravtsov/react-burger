import style from './index.module.css';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';



const RegisterPage = ({  }) => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


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
            onClick={() => undefined}>
            Зарегистрироваться
        </Button>

        <p className={"text_color_inactive text text_type_main-small mb-4"}>
            <span>Уже зарегистрированы? </span>
            <Link 
                to='/login' 
                className={style.link}>
                Войти
            </Link>
        </p>
    </div>
  )
}

export default RegisterPage;
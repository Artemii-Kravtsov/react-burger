import style from './index.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const ResetPasswordPage = ({  }) => {
  const [code, setCode] = useState()
  const [password, setPassword] = useState()

  return (
    <div className={style.container}>
        <h3 className={`text text_type_main-large mb-6`}>Восстановление пароля</h3>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={e => setPassword(e.target.value)}
          value={password}
          name={'password'}
          extraClass="mb-6"
          />
        <Input
          onChange={e => setCode(e.target.value)}
          type={'text'}
          placeholder={'Введите код из письма'}
          value={code}
          name={'code'}
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
          onClick={() => undefined}>
          Сохранить
        </Button>

        <p className={"text_color_inactive text text_type_main-small mb-4"}>
          <span>Вспомнили пароль? </span>
          <Link 
            to='/login' 
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
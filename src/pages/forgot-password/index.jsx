import style from './index.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const ForgotPasswordPage = ({  }) => {
  const [email, setEmail] = useState()

  return (
    <div className={style.container}>
        <h3 className={`text text_type_main-large mb-6`}>Восстановление пароля</h3>
        <EmailInput
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder={'Укажите e-mail'}
            name={'email'}
            isIcon={false}
            extraClass="mb-6"
            />
        <Button 
            htmlType="button" 
            type="primary" 
            size="large" 
            extraClass={'mb-20'} 
            width="36" 
            height="36"
            disabled={!email}
            onClick={() => undefined}>
            Восстановить
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

ForgotPasswordPage.propTypes = {
}

export default ForgotPasswordPage;
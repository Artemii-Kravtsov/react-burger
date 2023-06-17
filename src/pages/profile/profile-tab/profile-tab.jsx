import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';



const ProfileTab = ({  }) => {
  const getProfile = (store) => store.profile
  const {email, name} = useSelector(getProfile)

  return (
    <>
    <Input
      type={'text'}
      placeholder={'Имя'}
      disabled={true}
      value={name}
      name={'name'}
      icon="EditIcon"
      // onIconClick={onIconClick}
      extraClass="mb-6"
    />
    <EmailInput
      placeholder='Логин'
      value={email}
      disabled={true}
      name={'email'}
      icon="EditIcon"
      // onIconClick={onIconClick}
      extraClass="mb-6"
      />
    <PasswordInput
      placeholder='Пароль'
      value={"******"}
      disabled={true}
      icon="EditIcon"
      // onIconClick={onIconClick}
      name={'password'}
      />
    </>
  )
}

ProfileTab.propTypes = {
}

export default ProfileTab;
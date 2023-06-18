import style from './profile-tab.module.css'
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../../services/actions/profile';


const ProfileTab = () => {
  const dispatch = useDispatch()
  const getProfile = (store) => store.profile
  const {email, name} = useSelector(getProfile)

  const [newName, setName] = useState(name)
  const [newEmail, setEmail] = useState(email)
  const [newPassword, setPassword] = useState('******')

  const [nameEnabled, setNameEnabled] = useState(false)
  const [emailEnabled, setEmailEnabled] = useState(false)
  const [passwordEnabled, setPasswordEnabled] = useState(false)
  const [editInProcess, setEditInProcess] = useState(false)

  const canEdit = (email !== newEmail) || (name !== newName) || (newPassword !== '******')

  const toggleNameEnabled = useCallback(() => {
    if (nameEnabled) {
      setName(name)
    } 
    setNameEnabled(!nameEnabled)
  })

  const toggleEmailEnabled = useCallback(() => {
    if (emailEnabled) {
      setEmail(email)
    } 
    setEmailEnabled(!emailEnabled)
  })

  const togglePasswordEnabled = useCallback(() => {
    if (passwordEnabled) {
      setPassword('******')
    }
    setPasswordEnabled(!passwordEnabled)
  })

  function toInitial() {
    setName(name)
    setEmail(email)
    setPassword('******')
    setNameEnabled(false)
    setEmailEnabled(false)
    setPasswordEnabled(false)
  }

  function clear(event) {
    event.preventDefault()
    if (canEdit) toInitial()
  }

  function edit() {
    setEditInProcess(true)
    dispatch(editUser({name: newName, 
                       email: newEmail, 
                       password: newPassword}, 
                      {onSuccess: toInitial, 
                       onFinish: () => setEditInProcess(false)}))
  }

  return (
    <>
    <Input
      type={'text'}
      placeholder={'Имя'}
      disabled={!nameEnabled}
      value={newName}
      name={'name'}
      icon={!nameEnabled ? "EditIcon" : "CloseIcon"}
      onIconClick={toggleNameEnabled}
      onChange={e => setName(e.target.value)}
      extraClass="mb-6"
    />
    <EmailInput
      placeholder='Логин'
      value={newEmail}
      disabled={!emailEnabled}
      name={'email'}
      icon={!emailEnabled ? "EditIcon" : "CloseIcon"}
      onIconClick={toggleEmailEnabled}
      onChange={e => setEmail(e.target.value)}
      extraClass="mb-6"
      />
    <Input
      type={'password'}
      placeholder='Пароль'
      value={newPassword}
      disabled={!passwordEnabled}
      name={'password'}
      icon={!passwordEnabled ? "EditIcon" : "CloseIcon"}
      onIconClick={togglePasswordEnabled}
      onChange={e => setPassword(e.target.value)}
      extraClass="mb-6"
      />

    <div className={style.buttonArea}>
      <a className={(style.cancel 
                     + " mr-8 text text_type_main-small " 
                     + (!canEdit && `text_color_inactive ${style.inactiveCancel}`))} 
         href="#" 
         onClick={clear}>
        Отмена
      </a>
      <Button 
        htmlType="button" 
        type="primary" 
        size="large" 
        extraClass={'mb-20'} 
        width="36" 
        height="36"
        disabled={!canEdit}
        onClick={edit}>
        {editInProcess ? "Сохраняю..." : "Сохранить"}
      </Button>
    </div>
    </>
  )
}


export default ProfileTab;
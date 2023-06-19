import style from './profile-tab.module.css'
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
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

  useEffect(() => {
    if (name !== newName) setName(name)
    if (email !== newEmail) setEmail(email)
  }, [email, name])

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
  }

  function blockEdit() {
    setNameEnabled(false)
    setEmailEnabled(false)
    setPasswordEnabled(false)
  }

  function clear(event) {
    event.preventDefault()
    if (canEdit) {
      toInitial()
      blockEdit()
    } 
  }

  function edit(event) {
    event.preventDefault()
    setEditInProcess(true)
    const payload = new Object()
    if (name !== newName) payload['name'] = newName
    if (email !== newEmail) payload['email'] = newEmail
    if ('******' !== newPassword) payload['password'] = newPassword
    dispatch(editUser(payload, 
                      {onSuccess: blockEdit, 
                       onFinish: () => setEditInProcess(false)}))
  }
  
  return (
    <form onSubmit={edit} 
          onReset={clear}
          className={style.form}
          >
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
        <Button 
          htmlType="reset" 
          type="secondary" 
          size="large" 
          extraClass={'mb-20'}
          width="36" 
          height="36"
          disabled={!canEdit}>
          Отмена
        </Button>
        <Button 
          htmlType="submit" 
          type="primary" 
          size="large" 
          extraClass={'mb-20'} 
          width="36" 
          height="36"
          disabled={!canEdit}>
          {editInProcess ? "Сохраняю..." : "Сохранить"}
        </Button>
      </div>
    </form>
  )
}


export default ProfileTab;
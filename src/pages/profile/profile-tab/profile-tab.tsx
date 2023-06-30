import style from './profile-tab.module.css'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../../services/actions/profile';
import { FC, FormEvent } from 'react';
import { TBlindFunction, TStore, TUserProfile } from '../../../utils/types';


const ProfileTab: FC = () => {
  const dispatch: any = useDispatch()
  const getProfile = (store: TStore) => store.profile
  const {email, name} = useSelector(getProfile)
  const [newName, setName] = useState(name)
  const [newEmail, setEmail] = useState(email)
  const [newPassword, setPassword] = useState<string>('******')

  const [nameEnabled, setNameEnabled] = useState<boolean>(false)
  const [emailEnabled, setEmailEnabled] = useState<boolean>(false)
  const [passwordEnabled, setPasswordEnabled] = useState<boolean>(false)
  const [editInProcess, setEditInProcess] = useState<boolean>(false)

  const canEdit = (email !== newEmail) || (name !== newName) || (newPassword !== '******')

  useEffect((): void => {
    if (name !== newName) setName(name)
    if (email !== newEmail) setEmail(email)
  }, [email, name])

  const toggleNameEnabled: TBlindFunction = useCallback(() => {
    if (nameEnabled) {
      setName(name)
    } 
    setNameEnabled(!nameEnabled)
  }, [nameEnabled, name])

  const toggleEmailEnabled: TBlindFunction = useCallback(() => {
    if (emailEnabled) {
      setEmail(email)
    } 
    setEmailEnabled(!emailEnabled)
  }, [emailEnabled, email])

  const togglePasswordEnabled: TBlindFunction = useCallback(() => {
    if (passwordEnabled) {
      setPassword('******')
    }
    setPasswordEnabled(!passwordEnabled)
  }, [passwordEnabled])

  const toInitial: TBlindFunction = () => {
    setName(name)
    setEmail(email)
    setPassword('******')
  }

  const blockEdit: TBlindFunction = () => {
    setNameEnabled(false)
    setEmailEnabled(false)
    setPasswordEnabled(false)
  }

  function clear(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (canEdit) {
      toInitial()
      blockEdit()
    } 
  }

  function edit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setEditInProcess(true)
    const payload: Partial<TUserProfile> = new Object()
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
        value={newName || ''}
        name={'name'}
        icon={!nameEnabled ? "EditIcon" : "CloseIcon"}
        onIconClick={toggleNameEnabled}
        onChange={e => setName(e.target.value)}
        extraClass="mb-6"
      />
      <Input
        type='email'
        placeholder='Логин'
        value={newEmail || ''}
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
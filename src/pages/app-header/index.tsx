import style from './index.module.css';
import HeaderItem from './header-item/header-item';
import { Logo, ListIcon, BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, FC } from 'react';
import { useNavigate, useLocation } from "react-router-dom";


const AppHeader: FC = () => {
  const [selectedScreen, setSelectedScreen] = useState<string>('Конструктор')
  const location = useLocation()
  const navigate = useNavigate()

  function onConstructorClick() {
    setSelectedScreen('Конструктор')
    navigate('/')
  };
  function onOrdersClick() {
    setSelectedScreen('Лента заказов')
    navigate('/feed')
  };
  function onProfileClick() {
    setSelectedScreen('Личный кабинет')
    navigate('/profile')
  };

  useEffect(() => {
    if (location.pathname === '/' && selectedScreen !== 'Конструктор') {
      setSelectedScreen('Конструктор')
    }
    if (location.pathname.startsWith('/feed') && selectedScreen !== 'Лента заказов') {
      setSelectedScreen('Лента заказов')
    }
  }, [location.pathname])

  return (
    <header className={style.header}>

      <nav className='selectScreen'>
        <HeaderItem 
              Icon={BurgerIcon} 
              title={'Конструктор'} 
              onClick={onConstructorClick} 
              currentSelection={selectedScreen} />
        <HeaderItem 
              Icon={ListIcon} 
              title={'Лента заказов'} 
              onClick={onOrdersClick} 
              currentSelection={selectedScreen} />
      </nav>

      <span className={`${style.logoContainer} pb-4  pt-4`}>
        <Logo/>
      </span>

      <article className='userProfile mr-4'>
        <HeaderItem 
              Icon={ProfileIcon} 
              title={'Личный кабинет'}
              onClick={onProfileClick} 
              currentSelection={selectedScreen} />
      </article>

    </header>
  )
}

export default AppHeader;
import style from './app-header.module.css';
import HeaderItem from '../header-item/header-item.jsx';
import { Logo, ListIcon, BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const AppHeader = ({ selectedScreen, onHeaderItemClick }) => {

  const onButtonClick = (x) => {
    onHeaderItemClick(x)
  }

  return (
    <header className={style.header}>

      <nav className='selectScreen'>
        <HeaderItem Icon={BurgerIcon} title={'Конструктор'} onClick={onButtonClick.bind(this, 'Конструктор')} currentSelection={selectedScreen} />
        <HeaderItem Icon={ListIcon} title={'Лента заказов'} onClick={onButtonClick.bind(this, 'Лента заказов')} currentSelection={selectedScreen} />
      </nav>

      <span className={`${style.logoContainer} pb-4  pt-4`}>
        <Logo/>
      </span>

      <article className='userProfile'>
        <HeaderItem Icon={ProfileIcon} title={'Личный кабинет'} onClick={() => {}} currentSelection={''} />
      </article>

    </header>
  )
}

export default AppHeader;
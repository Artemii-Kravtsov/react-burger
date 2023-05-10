import style from './app-header.module.css';
import HeaderItem from '../header-item/header-item.jsx';
import { Logo, ListIcon, BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


const AppHeader = ({ selectedScreen, onHeaderItemClick }) => {

  return (
    <header className={style.header}>

      <nav className='selectScreen'>
        <HeaderItem Icon={BurgerIcon} title={'Конструктор'} onClick={onHeaderItemClick.bind(this, 'Конструктор')} currentSelection={selectedScreen} />
        <HeaderItem Icon={ListIcon} title={'Лента заказов'} onClick={onHeaderItemClick.bind(this, 'Лента заказов')} currentSelection={selectedScreen} />
      </nav>

      <span className={`${style.logoContainer} pb-4  pt-4`}>
        <Logo/>
      </span>

      <article className='userProfile mr-4'>
        <HeaderItem Icon={ProfileIcon} title={'Личный кабинет'} onClick={() => {}} currentSelection={''} />
      </article>

    </header>
  )
}

AppHeader.propTypes = {
  selectedScreen: PropTypes.string.isRequired,
  onHeaderItemClick: PropTypes.func.isRequired
}

export default AppHeader;
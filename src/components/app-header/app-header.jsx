import React from 'react';
import style from './app-header.module.css';
import HeaderItem from '../header-item/header-item.jsx';
import { Logo, ListIcon, BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


class AppHeader extends React.Component {

  state = {selectedScreen: 'Конструктор'}

  onButtonClick = (x) => {
    this.props.onHeaderItemClick(x)
  }

  render = () => {return (
    <header className={style.header}>

      <nav className='selectScreen'>
        <HeaderItem Icon={BurgerIcon} title={'Конструктор'} onClick={this.onButtonClick.bind(this, 'Конструктор')} currentSelection={this.props.selectedScreen} />
        <HeaderItem Icon={ListIcon} title={'Лента заказов'} onClick={this.onButtonClick.bind(this, 'Лента заказов')} currentSelection={this.props.selectedScreen} />
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
}

export default AppHeader;
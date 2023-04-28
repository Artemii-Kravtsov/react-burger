import React from 'react';
import style from './header-item.module.css';


const HeaderItem = ({Icon, onClick, title, currentSelection}) => (
  <div className={`${style.headerItem} mt-4 mb-4 pl-5 pr-5`} onClick={onClick}>
    <Icon type={currentSelection === title ? 'primary' : 'secondary'}/>
    <p className={style.p + ' pl-2 text text_type_main-default' + (currentSelection === title ? '' : ' text_color_inactive')}>{title}</p>
  </div>
);

export default HeaderItem;
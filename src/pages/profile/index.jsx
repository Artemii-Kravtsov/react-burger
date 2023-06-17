import style from './index.module.css';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


const ProfilePage = ({  }) => {
  const activeLink = `${style.link} ${style.activeLink} text text_type_main-medium`
  const inactiveLink = `${style.link} text text_type_main-medium text_color_inactive`
  const isActive = ({ isActive }) => isActive ? activeLink : inactiveLink
  return (
    <div className={style.profileContainer}>
      <nav className={`${style.nav} mt-4`}>
        <NavLink 
            end
            to='' 
            className={isActive}
            >
            Профиль
        </NavLink>
        <NavLink 
            to='orders' 
            className={isActive}
            >
            История заказов
        </NavLink>
        <NavLink 
            to='/' 
            className={isActive}
            >
            Выход
        </NavLink>
        <p className="mt-20 text_type_main-small text_color_inactive">В этом разделе вы можете<br />изменить свои персональные данные</p>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>      
  )
}

ProfilePage.propTypes = {
}

export default ProfilePage;
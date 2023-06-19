import style from './index.module.css';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../services/actions/profile';


const ProfilePage = ({  }) => {
  const activeLink = `${style.link} ${style.activeLink} text text_type_main-medium`
  const inactiveLink = `${style.link} text text_type_main-medium text_color_inactive`
  const isActive = ({ isActive }) => isActive ? activeLink : inactiveLink
  const dispatch = useDispatch()

  function onLogoutClick(event) {
    event.preventDefault()
    dispatch(logOut())
  }

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
            to='' 
            className={inactiveLink}
            onClick={onLogoutClick}
            >
            Выход
        </NavLink>
        <p className="mt-20 text_type_main-small text_color_inactive">
          В этом разделе вы можете<br />изменить свои персональные данные
        </p>
      </nav>
      <div className={style.tabContainer}>
        <Outlet />
      </div>
    </div>      
  )
}

ProfilePage.propTypes = {
}

export default ProfilePage;
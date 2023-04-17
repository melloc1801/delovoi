import React, { useContext } from 'react';
import { LogoWithName } from '../../UI/LogoWithName';
import styles from './styles.module.scss';
import {
  CheckFilledRoundedIcon,
  CheckRoundedOutlinedIcon,
  HomeFilledIcon,
  HomeOutlinedIcon,
  RightArrowIcon,
  TasksFilledIcon,
  TasksOutlinedIcon,
} from '../../assets/icons';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Badge } from '../../UI/Badge';
import { AuthContext, useSignoutMutation } from '../../modules/auth';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const links = [
  {
    activeIcon: HomeFilledIcon,
    defaultIcon: HomeOutlinedIcon,
    value: 'Главная',
    href: '/',
  },
  {
    activeIcon: TasksFilledIcon,
    defaultIcon: TasksOutlinedIcon,
    value: 'Поиск заданий',
    href: '/search',
    // notificationsAmount: 44,
  },
  {
    activeIcon: CheckFilledRoundedIcon,
    defaultIcon: CheckRoundedOutlinedIcon,
    value: 'Мои задания',
    href: '/mytasks',
    notificationsAmount: undefined,
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const ls = useLocalStorage();
  const authContext = useContext(AuthContext);
  const { mutateAsync } = useSignoutMutation();

  const onLogoutHandle = () => {
    if (authContext.token) {
      mutateAsync(authContext.token).then(() => {
        authContext.setAuth(false);
        authContext.setToken('');
        ls.removeToken();
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <LogoWithName />
      <div className={styles.nav__wrapper}>
        {links.map((link) => {
          const DefaultIcon = link.defaultIcon;
          const ActiveIcon = link.activeIcon;
          const isActive = location.pathname === link.href;

          return (
            <NavLink
              className={classNames(
                { [styles['nav__link--active']]: isActive },
                styles.nav__link
              )}
              to={link.href}
              key={link.value + link.href}
            >
              <div>
                {isActive ? (
                  <ActiveIcon width={18} height={18} fill="#3BF1E2" />
                ) : (
                  <DefaultIcon width={18} height={18} fill="#3C2D96" />
                )}
              </div>
              <div className={styles.nav__text}>{link.value}</div>
              {link.notificationsAmount ? (
                <Badge value={link.notificationsAmount} />
              ) : null}
            </NavLink>
          );
        })}
      </div>
      <button className={styles.exit} onClick={onLogoutHandle}>
        <RightArrowIcon width={18} height={18} fill="#3C2D96" />
        Выйти
      </button>
    </div>
  );
};

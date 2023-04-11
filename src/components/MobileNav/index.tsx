import React from 'react';
import {
  CheckFilledRoundedIcon,
  CheckRoundedOutlinedIcon,
  HomeFilledIcon,
  HomeOutlinedIcon,
  TasksFilledIcon,
  TasksOutlinedIcon,
} from '../../assets/icons';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import classNames from 'classnames';

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
    notificationsAmount: 44,
  },
  {
    activeIcon: CheckFilledRoundedIcon,
    defaultIcon: CheckRoundedOutlinedIcon,
    value: 'Мои задания',
    href: '/mytasks',
    notificationsAmount: 4,
  },
];
export const MobileNav: React.FC = () => {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      {links.map((link) => {
        const DefaultIcon = link.defaultIcon;
        const ActiveIcon = link.activeIcon;
        const isActive = location.pathname === link.href;

        return (
          <NavLink
            className={classNames(
              { [styles['link--active']]: isActive },
              styles.link
            )}
            key={link.value + link.href}
            to={link.href}
          >
            {isActive ? (
              <ActiveIcon width={20} height={20} fill="#3C2D96" />
            ) : (
              <DefaultIcon width={20} height={20} fill="#3C2D96" />
            )}
            {link.value}
          </NavLink>
        );
      })}
    </div>
  );
};

import React from 'react';
import { LogoIcon, StarIcon } from '../../assets/icons';
import styles from './styles.module.scss';
import { Button } from '../../UI/Button';

interface HeaderProps {
  profile: {
    avatarUrl: string;
    name: string;
    status: string;
    rating: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <img
          className={styles.profile__img}
          src={profile.avatarUrl}
          alt="Profile avatart"
        />
        <div className={styles.profile__info}>
          <div className={styles.profile__name}>{profile.name}</div>
          <div className={styles.profile__status}>{profile.status}</div>
        </div>
        <div className={styles.profile__rating}>
          <StarIcon width={28} height={28} fill="#FFD480" />
          {profile.rating}
        </div>
      </div>
      <div className={styles.controlls}>
        {/* <div className={styles.notifications}> */}
        {/*  <div className={styles.notifications__identifier}></div> */}
        {/*  <BellIcon width={20} height={20} fill="#798C9D" /> */}
        {/* </div> */}
        <Button icon={LogoIcon}>Начать выполнять задание</Button>
      </div>
    </div>
  );
};

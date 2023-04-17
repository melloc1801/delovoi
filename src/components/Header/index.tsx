import React from 'react';
import { LogoIcon, StarIcon } from '../../assets/icons';
import styles from './styles.module.scss';
import { Button } from '../../UI/Button';

interface HeaderProps {
  profile: {
    avatarUrl?: string;
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
          src={
            profile.avatarUrl ??
            'https://camo.githubusercontent.com/c6fe2c13c27fe87ac6581b9fe289d2f071bd1b4ef6f3e3c5fc2aba0bbc23fd88/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37632f50726f66696c655f6176617461725f706c616365686f6c6465725f6c617267652e706e67'
          }
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

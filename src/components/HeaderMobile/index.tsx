import React from 'react';
import { Logo } from '../../UI/Logo';
import { StarIcon } from '../../assets/icons';
import styles from './styles.module.scss';

interface HeaderMobileProps {
  profile: {
    avatarUrl?: string;
    name: string;
    status: string;
    rating: string;
  };
}

export const HeaderMobile: React.FC<HeaderMobileProps> = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Logo />
        <div className={styles.rating}>
          <StarIcon width={20} height={20} fill="#FFD480" />
          {profile.rating}
        </div>
      </div>
      <div>
        <img
          className={styles.profile__img}
          src={
            profile.avatarUrl ??
            'https://camo.githubusercontent.com/c6fe2c13c27fe87ac6581b9fe289d2f071bd1b4ef6f3e3c5fc2aba0bbc23fd88/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37632f50726f66696c655f6176617461725f706c616365686f6c6465725f6c617267652e706e67'
          }
          alt="Profile avatart"
        />
      </div>
    </div>
  );
};

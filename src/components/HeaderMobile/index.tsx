import React from 'react';
import { Logo } from '../../UI/Logo';
import { StarIcon } from '../../assets/icons';
import styles from './styles.module.scss';

interface HeaderMobileProps {
  profile: {
    avatarUrl: string;
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
          src={profile.avatarUrl}
          alt="profile img"
        />
      </div>
    </div>
  );
};

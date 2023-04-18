import React, { useContext } from 'react';
import { LogoIcon, StarIcon } from '../../assets/icons';
import styles from './styles.module.scss';
import { Button } from '../../UI/Button';
import { ProfileContext } from '../../modules/profile';
import classNames from 'classnames';

interface HeaderProps {
  profile: {
    avatarUrl?: string;
    lastname: string;
    firstname: string;
    status: string;
    rating: string;
    region: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ profile }) => {
  const profileContext = useContext(ProfileContext);

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
          <div className={styles.profile__name}>
            {profile.firstname} {profile.lastname}
          </div>
          <div
            className={classNames(
              {
                [styles['profile__status--red']]:
                  !profileContext.isStatusVerified,
              },
              styles.profile__status
            )}
          >
            {profile.status}
          </div>
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
        <div className={styles.region}>{profile.region}</div>
        <div>
          <Button icon={LogoIcon} disabled>
            Начать выполнять задание
          </Button>
        </div>
      </div>
    </div>
  );
};

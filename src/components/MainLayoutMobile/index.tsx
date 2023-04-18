import React from 'react';
import { HeaderMobile } from '../HeaderMobile';
import { Header } from '../Header';
import styles from './styles.module.scss';
import { MobileNav } from '../MobileNav';
import { type Profile } from '../../modules/profile';

interface MainLayoutMobileProps extends Profile {
  children: React.ReactNode;
}

export const MainLayoutMobile: React.FC<MainLayoutMobileProps> = ({
  lastname,
  firstname,
  region,
  status,
  isStatusVerified,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header__wrapper}>
        {window.innerWidth >= 680 ? (
          <Header
            profile={{
              rating: '5.0',
              status,
              lastname,
              firstname,
              region,
            }}
          />
        ) : (
          <HeaderMobile
            profile={{
              rating: '5.0',
              status,
              firstname,
              lastname,
              isVerified: isStatusVerified,
            }}
          />
        )}
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.nav}>
        <MobileNav />
      </div>
    </div>
  );
};

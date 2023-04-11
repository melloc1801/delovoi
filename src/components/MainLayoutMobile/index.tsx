import React from 'react';
import { HeaderMobile } from '../HeaderMobile';
import { Header } from '../Header';
import styles from './styles.module.scss';
import { MobileNav } from '../MobileNav';

interface MainLayoutMobileProps {
  children: React.ReactNode;
}

export const MainLayoutMobile: React.FC<MainLayoutMobileProps> = ({
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header__wrapper}>
        {window.innerWidth >= 680 ? (
          <Header
            profile={{
              rating: 4.94,
              status: 'Самозанятый',
              name: 'Четырин Аркадий',
              avatarUrl:
                'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
            }}
          />
        ) : (
          <HeaderMobile
            profile={{
              rating: 4.94,
              status: 'Самозанятый',
              name: 'Четырин Аркадий',
              avatarUrl:
                'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
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

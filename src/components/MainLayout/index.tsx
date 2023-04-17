import React from 'react';
import { Sidebar } from '../Sidebar';
import styles from './styles.module.scss';
import { Header } from '../Header';
import { type Profile } from '../../modules/profile';

interface MainLayoutProps extends Profile {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  lastname,
  firstname,
  children,
  status,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <main className={styles.main}>
        <Header
          profile={{
            rating: '5.0',
            status,
            name: `${lastname} ${firstname}`,
            avatarUrl:
              'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          }}
        />
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};

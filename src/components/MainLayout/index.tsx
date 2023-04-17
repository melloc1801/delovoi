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
          }}
        />
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};

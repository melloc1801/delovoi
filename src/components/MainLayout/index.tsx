import React from 'react';
import { Sidebar } from '../Sidebar';
import styles from './styles.module.scss';
import { Header } from '../Header';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <main className={styles.main}>
        <Header
          profile={{
            rating: 4.94,
            status: 'Самозанятый',
            name: 'Четырин Аркадий',
            avatarUrl:
              'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          }}
        />
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};

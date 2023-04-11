import React from 'react';
import { AuthForm } from '../../modules/auth';
import styles from './styles.module.scss';

export const AuthPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <AuthForm />
      </div>
    </div>
  );
};

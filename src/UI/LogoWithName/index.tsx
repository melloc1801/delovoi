import React from 'react';
import { Logo } from '../Logo';
import styles from './styles.module.scss';

export const LogoWithName: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <div className={styles.name}>Деловой</div>
    </div>
  );
};

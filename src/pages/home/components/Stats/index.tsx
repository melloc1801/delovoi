import React from 'react';
import { Balance } from '../Balance';
import styles from './styles.module.scss';
import { Status } from '../Status';

export const Stats: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Balance value={12000} />
      <Status />
    </div>
  );
};

import React from 'react';
import { Balance } from '../Balance';
import styles from './styles.module.scss';
import { Status } from '../Status';

interface StatsProps {
  balance: number;
}

export const Stats: React.FC<StatsProps> = ({ balance }) => {
  return (
    <div className={styles.wrapper}>
      <Balance value={balance} />
      <Status />
    </div>
  );
};

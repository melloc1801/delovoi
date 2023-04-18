import React, { useContext } from 'react';
import { Balance } from '../Balance';
import styles from './styles.module.scss';
import { Status } from '../Status';
import { ProfileContext } from '../../../../modules/profile';

interface StatsProps {
  balance: number;
}

export const Stats: React.FC<StatsProps> = ({ balance }) => {
  const profileContext = useContext(ProfileContext);

  return (
    <div className={styles.wrapper}>
      <Balance value={balance} />
      {profileContext.isStatusVerified ? <Status /> : null}
      <Status />
    </div>
  );
};

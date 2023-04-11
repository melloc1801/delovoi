import React from 'react';
import styles from './styles.module.scss';
import { Logo } from '../../../../UI/Logo';
import { DeliveryIcon, DinnerIcon } from '../../../../assets/icons';
import { Button } from '../../../../UI/Button';

interface TaskCardProps {
  organization: {
    name: string;
    avatarUrl?: string;
  };
  post: string;
  address: string;
  time: string;
  paymentRate: string;
  selected?: boolean;
  onSelect?: () => {};
}

export const TaskCard: React.FC<TaskCardProps> = ({
  paymentRate,
  post,
  time,
  address,
  organization,
  selected = false,
  onSelect,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.organization}>
          {organization.avatarUrl ? (
            <img src={organization.avatarUrl} alt="organization logo" />
          ) : (
            <Logo variant="secondary" size="sm" />
          )}
          {organization.name}
        </div>
        <div className={styles.post}>{post}</div>
        <div className={styles.address}>
          {address}
          <DinnerIcon width={24} height={24} stroke="#3C2D96" />
          <DeliveryIcon width={24} height={24} stroke="#3C2D96" />
        </div>
        <div className={styles.time}>{time}</div>
        <div className={styles.paymentRate}>{paymentRate}</div>
        <Button className={styles.col}>Взять в работу</Button>
      </div>
    </div>
  );
};

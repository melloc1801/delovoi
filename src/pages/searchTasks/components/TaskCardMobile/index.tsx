import React from 'react';
import { Logo } from '../../../../UI/Logo';
import styles from './styles.module.scss';
import {
  CalendarIcon,
  DeliveryIcon,
  DinnerIcon,
  GeoIcon,
} from '../../../../assets/icons';
import { Button } from '../../../../UI/Button';

interface TaskCardMobileProps {
  organization: {
    name: string;
    avatarUrl?: string;
  };
  post: string;
  address: string;
  time: string;
  paymentRate: string;
  selected?: boolean;
  onSelect?: () => void;
}

export const TaskCardMobile: React.FC<TaskCardMobileProps> = ({
  selected,
  onSelect,
  organization,
  post,
  time,
  address,
  paymentRate,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        {organization.avatarUrl ? (
          <img src={organization.avatarUrl} alt="organization logo" />
        ) : (
          <Logo variant="secondary" size="sm" />
        )}
        {organization.name}
      </div>
      <div className={styles.body}>
        <div className={styles.date}>
          <CalendarIcon width={20} height={20} fill="#87A2BE" />
          {time}
        </div>
        <div className={styles.features}>
          <DinnerIcon width={24} height={24} stroke="#3C2D96" />
          <DeliveryIcon width={24} height={24} stroke="#3C2D96" />
        </div>
        <div className={styles.post}>{post}</div>
        <div className={styles.paymentRate}>{paymentRate}</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.address}>
          <GeoIcon width={14} height={20} fill="#FFD480" />
          ул. Льва Толстого, 21
        </div>
        <div className={styles.controlls}>
          <Button>Взять в работу</Button>
        </div>
      </div>
    </div>
  );
};

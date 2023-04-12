import React from 'react';
import styles from './styles.module.scss';
import { Logo } from '../../../../UI/Logo';
import {
  DeliveryIcon,
  DinnerIcon,
  ShevronDownIcon,
} from '../../../../assets/icons';
import { Button } from '../../../../UI/Button';
import classNames from 'classnames';

interface TaskCardProps {
  organization: {
    name: string;
    avatarUrl?: string;
  };
  description: string;
  post: string;
  address: string;
  time: string;
  paymentRate: string;
  selected?: boolean;
  onSelect?: () => void;
  hasDiscount?: boolean;
  isOpenDefault?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  paymentRate,
  post,
  time,
  address,
  organization,
  selected = false,
  onSelect,
  hasDiscount = false,
  description,
  isOpenDefault = false,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(isOpenDefault);

  return (
    <div
      className={classNames(
        { [styles['wrapper--discount']]: hasDiscount },
        styles.wrapper
      )}
    >
      <div
        className={styles.grid}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <div className={styles.organization}>
          {organization.avatarUrl ? (
            <img
              className={styles.organization__img}
              src={organization.avatarUrl}
              alt="organization logo"
            />
          ) : (
            <Logo variant="secondary" size="sm" />
          )}
          {organization.name}
        </div>
        <div
          className={classNames(
            { [styles['post--discount']]: hasDiscount },
            styles.post
          )}
        >
          {post}
        </div>
        <div className={styles.address}>
          {address}
          <DinnerIcon width={24} height={24} stroke="#3C2D96" />
          <DeliveryIcon width={24} height={24} stroke="#3C2D96" />
        </div>
        <div className={styles.time}>{time}</div>
        <div className={styles.paymentRate}>{paymentRate}</div>
        <div className={styles.controlls}>
          <Button>Взять в работу</Button>
          <div className={classNames({ [styles.rotate]: isOpen })}>
            <ShevronDownIcon width={12} height={8} />
          </div>
        </div>
      </div>
      {isOpen ? <div className={styles.description}>{description}</div> : null}
    </div>
  );
};

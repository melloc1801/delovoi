import React from 'react';
import { Logo } from '../../../../UI/Logo';
import styles from './styles.module.scss';
import {
  CalendarIcon,
  DeliveryIcon,
  DinnerIcon,
  GeoIcon,
  ShevronDownIcon,
} from '../../../../assets/icons';
import { Button } from '../../../../UI/Button';
import classNames from 'classnames';
import moment from 'moment';

interface TaskCardMobileProps {
  organization: {
    name: string;
    avatarUrl?: string;
  };
  post: string;
  address: string;
  time: string;
  paymentRate: string;
  description: string;
  selected?: boolean;
  onSelect?: () => void;
  hasDiscount?: boolean;
  paymentCondition: string;
  isDefaultOpen?: boolean;
  onAccept: () => Promise<any>;
  onDismiss: () => Promise<any>;
  meals?: boolean;
  driveway?: boolean;
  orderDate: string;
}

export const TaskCardMobile: React.FC<TaskCardMobileProps> = ({
  selected,
  onSelect,
  organization,
  post,
  time,
  address,
  paymentRate,
  hasDiscount = false,
  description,
  isDefaultOpen = false,
  onAccept,
  onDismiss,
  meals = false,
  driveway = false,
  paymentCondition,
  orderDate,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(isDefaultOpen);
  const [isAccepted, setIsAccepted] = React.useState<boolean>(false);

  const onAcceptHandle = () => {
    onAccept().then(() => setIsAccepted(true));
  };
  const onDismissHandle = () => {
    onDismiss().then(() => setIsAccepted(false));
  };

  return (
    <div
      className={classNames(
        { [styles['wrapper--discount']]: hasDiscount },
        styles.wrapper
      )}
    >
      <div
        className={classNames(
          { [styles['head--discount']]: hasDiscount },
          styles.head
        )}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <div className={styles.organization}>
          {organization.avatarUrl ? (
            <img
              className={styles.logo}
              src={organization.avatarUrl}
              alt="organization logo"
            />
          ) : (
            <Logo variant="secondary" size="sm" />
          )}
          {organization.name}
        </div>
        <div className={classNames({ [styles.rotated]: isOpen })}>
          <ShevronDownIcon width={12} height={8} />
        </div>
      </div>
      <>
        <div className={styles.body}>
          <div className={styles.date}>
            <CalendarIcon width={20} height={20} fill="#87A2BE" />
            <div>
              <div>{time}</div>
              <div>{moment(orderDate).format('DD.MM.YYYY')}</div>
            </div>
          </div>
          <div className={styles.features}>
            {driveway ? (
              <DeliveryIcon width={24} height={24} stroke="#3C2D96" />
            ) : null}
            {meals ? (
              <DinnerIcon width={24} height={24} stroke="#3C2D96" />
            ) : null}
          </div>
          {isOpen ? (
            <div className={styles.desription}>{description}</div>
          ) : null}
          <div className={styles.post__wrapper}>
            <div
              className={classNames(
                { [styles['post--discount']]: hasDiscount },
                styles.post
              )}
            >
              {post}
            </div>
          </div>
          <div className={styles.paymentRate}>
            <strong>Оплата</strong>
            <div>{paymentCondition}</div>
            <div>{paymentRate}</div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.address}>
            <GeoIcon width={14} height={20} fill="#FFD480" />
            {address}
          </div>
          <div className={styles.controlls}>
            {isAccepted ? (
              <Button onClick={onDismissHandle} variant="filled">
                Отменить
              </Button>
            ) : (
              <Button onClick={onAcceptHandle} variant="outlined">
                Записаться
              </Button>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

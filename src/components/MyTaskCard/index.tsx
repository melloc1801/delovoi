import React from 'react';
import { Logo } from '../../UI/Logo';
import styles from './styles.module.scss';
import {
  CalendarIcon,
  GeoIcon,
  RouteIcon,
  ShevronDownIcon,
} from '../../assets/icons';
import { Button } from '../../UI/Button';
import classNames from 'classnames';
import { useWindowResize } from '../../hooks/useWindowResize';

interface MyTaskCardProps {
  organization: {
    name: string;
    avatarURL?: string;
  };
  description: string;
  arrived: boolean;
  paymentDescription: string;
  medCard: boolean;
  specialConditions: string;
  address: string;
  post: string;
  date: string;
  isClosedTask?: boolean;
  isOpenDefault?: boolean;
}

export const MyTaskCard: React.FC<MyTaskCardProps> = ({
  medCard,
  address,
  date,
  description,
  paymentDescription,
  organization,
  specialConditions,
  arrived,
  post,
  isClosedTask = false,
  isOpenDefault = false,
}) => {
  const { size } = useWindowResize();
  const [isOpen, setIsOpen] = React.useState<boolean>(isOpenDefault);
  const onToggleMobile = () => {
    if (size <= 480) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(
          {
            [styles['header--closed']]: isClosedTask,
            [styles['header--default']]: !isClosedTask,
          },
          styles.header
        )}
        onClick={() => {
          onToggleMobile();
        }}
      >
        {isClosedTask ? (
          <div className={styles.closed__header}>Ваше ближайшее задание</div>
        ) : (
          <div className={styles.default__header}>
            {organization.avatarURL ? (
              <img src={organization.avatarURL} />
            ) : (
              <Logo variant="secondary" size="sm" />
            )}
            {organization.name}
          </div>
        )}
        {!isClosedTask && size <= 480 ? (
          <div className={classNames({ [styles.rotated]: isOpen })}>
            <ShevronDownIcon width={12} height={8} fill="#133552" />
          </div>
        ) : null}
      </div>
      <div className={styles.main}>
        <div className={styles.main__header}>
          <div className={styles.main__date}>
            <CalendarIcon width={20} height={20} fill="#87A2BE" />
            {date}
          </div>
          <div className={styles.main__post}>{post}</div>
        </div>
        {isClosedTask ? (
          <div className={styles.organization}>
            {organization.avatarURL ? (
              <img src={organization.avatarURL} />
            ) : (
              <Logo variant="secondary" size="sm" />
            )}
            {organization.name}
          </div>
        ) : null}
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.col__name}>Описание</div>
            <div className={styles.col__value}>{description}</div>
          </div>
          {isClosedTask || (isOpen && size <= 480) || size > 480 ? (
            <>
              <div className={styles.col}>
                <div className={styles.col__name}>Отметка о прибытии</div>
                <div
                  className={classNames(
                    styles.col__value,
                    styles['col__value--bool']
                  )}
                >
                  {arrived ? 'Да' : 'Нет'}
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.col__name}>Оплата</div>
                <div className={styles.col__value}>{paymentDescription}</div>
              </div>
              <div className={styles.col}>
                <div className={styles.col__name}>Медкнижка</div>
                <div
                  className={classNames(
                    styles.col__value,
                    styles['col__value--bool']
                  )}
                >
                  {medCard ? 'Да' : 'Нет'}
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.col__name}>Особые условия</div>
                <div className={styles.col__value}>{specialConditions}</div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.geo}>
          <GeoIcon width={12} height={20} fill="#FFD480" />
          ул. Льва Толстого, 21
        </div>
        <div className={styles.controlls}>
          <button className={styles.route}>
            <RouteIcon width={20} height={20} fill="#3BF1E2" />
          </button>
          <Button variant="outlined">Отменить</Button>
        </div>
      </div>
    </div>
  );
};

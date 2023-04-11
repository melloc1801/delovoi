import React from 'react';
import { Logo } from '../../UI/Logo';
import styles from './styles.module.scss';
import { CalendarIcon, GeoIcon, RouteIcon } from '../../assets/icons';
import { Button } from '../../UI/Button';
import classNames from 'classnames';

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
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {organization.avatarURL ? (
          <img src={organization.avatarURL} />
        ) : (
          <Logo variant="secondary" size="sm" />
        )}
        {organization.name}
      </div>
      <div className={styles.main}>
        <div className={styles.main__header}>
          <div className={styles.main__date}>
            <CalendarIcon width={20} height={20} fill="#87A2BE" />
            {date}
          </div>
          <div className={styles.main__post}>{post}</div>
        </div>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.col__name}>Описание</div>
            <div className={styles.col__value}>{description}</div>
          </div>
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

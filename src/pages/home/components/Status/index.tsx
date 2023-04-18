import React from 'react';
import styles from './styles.module.scss';
import { Button } from '../../../../UI/Button';
import classNames from 'classnames';

interface StatusProps {
  isVerified?: boolean;
}

export const Status: React.FC<StatusProps> = ({ isVerified = false }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Статус</div>
      <div className={styles.inner}>
        <div
          className={classNames({
            [styles.value__verified]: !isVerified,
            [styles.value]: isVerified,
          })}
        >
          {isVerified ? 'Самозанятый' : 'Подтвердите свой статус самозанятого!'}
        </div>
        <div>
          <a
            href="https://play.google.com/store/apps/details?id=ru.delovoi"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outlined">
              {isVerified ? 'Подробнее' : 'Подтвердить'}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import styles from './styles.module.scss';
import { Button } from '../../../../UI/Button';

export const Status: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Статус</div>
      <div className={styles.inner}>
        <div className={styles.value}>Самозанятый</div>
        <div>
          <a
            href="https://play.google.com/store/apps/details?id=ru.delovoi"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outlined">Подробнее</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

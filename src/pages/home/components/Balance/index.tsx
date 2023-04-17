import React from 'react';
import { Button } from '../../../../UI/Button';
import styles from './styles.module.scss';
import { LogoIcon } from '../../../../assets/icons';

interface BalanceProps {
  value: number;
}

export const Balance: React.FC<BalanceProps> = ({ value }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Ваш баланс</div>
      <div className={styles.inner}>
        <div className={styles.value}>
          <LogoIcon width={18} height={36} fill="#3BF1E2" />
          {value} ₽
        </div>
        <div>
          <a
            href="https://play.google.com/store/apps/details?id=ru.delovoi"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outlined" color="secondary">
              Получить
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

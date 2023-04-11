import React from 'react';
import styles from './styles.module.scss';
import { SortIcon } from '../../../../assets/icons';

export const SortBar: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.col}>
        Объект
        <SortIcon fill="#87A2BE" />
      </button>
      <button className={styles.col}>
        Вид деятельности
        <SortIcon fill="#87A2BE" />
      </button>
      <button className={styles.col}>
        Адрес
        <SortIcon fill="#87A2BE" />
      </button>
      <button className={styles.col}>
        Время
        <SortIcon fill="#87A2BE" />
      </button>
      <button className={styles.col}>
        Ставка
        <SortIcon fill="#87A2BE" />
      </button>
      <div></div>
    </div>
  );
};

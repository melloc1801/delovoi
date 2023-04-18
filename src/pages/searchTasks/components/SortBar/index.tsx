import React from 'react';
import styles from './styles.module.scss';
import { SortIcon } from '../../../../assets/icons';
import classNames from 'classnames';

export interface Col {
  label: string;
  key: string;
  order: null | 'asc' | 'desc';
}

const cols: Col[] = [
  { label: 'Заказчик', key: 'customer_name', order: null },
  { label: 'Вид деятельности', key: 'vacancy', order: null },
  { label: 'Адрес', key: 'address_full', order: null },
  { label: 'Время', key: 'time_start', order: null },
  { label: 'Ставка', key: 'sum_shift', order: null },
];

interface SortBarProps {
  active?: Col;
  onSort: (col: Col) => void;
}

export const SortBar: React.FC<SortBarProps> = ({ active, onSort }) => {
  return (
    <div className={styles.wrapper}>
      {cols.map((col) => (
        <button
          className={classNames(
            {
              [styles['col--desc']]:
                active?.key === col.key && active.order === 'desc',
            },
            styles.col
          )}
          key={col.key}
          onClick={() => {
            if (col.key !== active?.key) {
              onSort({ ...col, order: 'desc' });
              return;
            }

            onSort({ ...col, order: active.order === 'desc' ? 'asc' : 'desc' });
          }}
        >
          {col.label}
          <SortIcon fill="#87A2BE" />
        </button>
      ))}
      <div></div>
    </div>
  );
};

import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { ShevronDownIcon } from '../../assets/icons';

export interface Pair {
  key: string;
  value: string;
}

interface SelectProps {
  values: Pair[];
  onSelect: (pair: Pair) => void;
  active?: Pair;
}

export const Select: React.FC<SelectProps> = ({ active, values, onSelect }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onSelectHandler = (pair: Pair) => {
    onSelect(pair);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(
          { [styles['head--empty']]: !active },
          styles.head
        )}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {active ? active.value : 'Ваш город'}
        <div
          className={classNames(
            { [styles['head__icon--opened']]: isOpen },
            styles.head__icon
          )}
        >
          <ShevronDownIcon width={12} height={7} fill="#798C9D" />
        </div>
      </div>
      {isOpen ? (
        <div className={styles.body}>
          <div className={styles.body__inner}>
            {values.map((pair, i) => (
              <div
                className={classNames(
                  { [styles['item--active']]: active?.key === pair.key },
                  styles.item
                )}
                key={i}
                onClick={() => {
                  onSelectHandler(pair);
                }}
              >
                {pair.value}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

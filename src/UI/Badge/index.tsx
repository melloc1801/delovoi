import React from 'react';
import styles from './styles.module.scss';

interface BadgeProps {
  value?: number;
}

export const Badge: React.FC<BadgeProps> = ({ value = 0 }) => {
  return <div className={styles.badge}>{value}</div>;
};

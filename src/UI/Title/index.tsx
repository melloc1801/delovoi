import React from 'react';
import styles from './styles.module.scss';

interface TitleProps {
  children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

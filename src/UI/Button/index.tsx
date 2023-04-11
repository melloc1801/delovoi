import React, { type ButtonHTMLAttributes } from 'react';
import { type IconType } from '../../assets/icons';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  icon?: IconType;
  variant?: 'filled' | 'outlined';
  color?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  children,
  variant = 'filled',
  color = 'primary',
  ...props
}) => {
  const Icon = icon;
  return (
    <button
      {...props}
      className={classNames(
        {
          [styles['button--outlined']]: variant === 'outlined',
          [styles['button--filled']]: variant === 'filled',
          [styles['button--primary']]: color === 'primary',
          [styles['button--secondary']]: color === 'secondary',
        },
        styles.button
      )}
    >
      <div>{Icon ? <Icon fill="#3BF1E2" width={20} height={20} /> : null}</div>
      {children}
    </button>
  );
};

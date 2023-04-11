import React from 'react';
import { LogoIcon } from '../../assets/icons';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface LogoProps {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'primary',
  size = 'md',
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isSm = size === 'sm';
  const isMd = size === 'md';
  const primaryIconColor = '#3BF1E2';
  const secondaryIconColor = '#87A2BE';
  const smIconWidth = 10;
  const smIconHeight = 20;
  const mdIconWidth = 16;
  const mdIconHeight = 32;

  return (
    <div
      className={classNames(
        {
          [styles['logo--primary']]: isPrimary,
          [styles['logo--secondary']]: isSecondary,
          [styles['logo--sm']]: isSm,
          [styles['logo--md']]: isMd,
        },
        styles.logo
      )}
    >
      <LogoIcon
        width={classNames({ [smIconWidth]: isSm, [mdIconWidth]: isMd })}
        height={classNames({ [smIconHeight]: isSm, [mdIconHeight]: isMd })}
        fill={classNames({
          [primaryIconColor]: isPrimary,
          [secondaryIconColor]: isSecondary,
        })}
      />
    </div>
  );
};

import React, { type InputHTMLAttributes } from 'react';
import { CloseIcon } from '../../assets/icons';
import styles from './styles.module.scss';
import classNames from 'classnames';

/*
 * 1. Mask
 * */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear: React.MouseEventHandler<HTMLButtonElement>;
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  onClear,
  errorMessage,
  ...inputProps
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['input-wrapper']}>
        <input
          {...inputProps}
          className={classNames(
            { [styles['input--error']]: errorMessage },
            styles.input
          )}
        />
        {inputProps.value ? (
          <button className={styles.close} onClick={onClear}>
            <CloseIcon width={20} height={20} fill="#87A2BE" />
          </button>
        ) : null}
      </div>
      {errorMessage ? <div className={styles.error}>{errorMessage}</div> : null}
    </div>
  );
};

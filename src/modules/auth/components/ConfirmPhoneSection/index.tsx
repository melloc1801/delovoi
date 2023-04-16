import React from 'react';
import styles from './styles.module.scss';
import { OTPInput } from '../../../../UI/OTPInput';
import { numberToMMSS } from '../../../../helpers/formatTime';

interface ConfirmPhoneSectionProps {
  onInputFilled: (code: string) => void;
  onRefreshCode: () => void;
  isPhoneConfirmed?: boolean;
  hasError?: boolean;
}

const COOLDOWN_VALUE = 30;
export const ConfirmPhoneSection: React.FC<ConfirmPhoneSectionProps> = ({
  onInputFilled,
  onRefreshCode,
  isPhoneConfirmed = false,
  hasError = false,
}) => {
  const [seconds, setSeconds] = React.useState(COOLDOWN_VALUE);
  const [isCooldownActive, setIsCooldownActive] = React.useState<boolean>(true);

  React.useEffect(() => {
    let interval: number;
    if (isCooldownActive) {
      interval = window.setInterval(() => {
        if (seconds - 1 > 0) {
          setSeconds((seconds) => seconds - 1);
        } else {
          setIsCooldownActive(false);
          setSeconds(COOLDOWN_VALUE);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCooldownActive, seconds]);

  return (
    <div className={styles.confirmation}>
      <div className={styles.confirmation__title}>Код подтверждения</div>
      <div className={styles.confirmation__subtitle}>
        Сейчас поступит звонок, введите последние 4 цифры
      </div>
      <div className={styles.confirmation__otp}>
        <OTPInput onInputFilled={onInputFilled} hasError={hasError} />
      </div>
      {isPhoneConfirmed ? (
        <div className={styles.confirmation__success}>Верный код</div>
      ) : isCooldownActive ? (
        <div className={styles.confirmation__cooldown}>
          Новый код придет в течении{' '}
          <span className={styles['confirmation__cooldown--purple']}>
            {numberToMMSS(seconds)}
          </span>
        </div>
      ) : (
        <button
          className={styles.confirmation__repeat}
          onClick={() => {
            onRefreshCode();
            setIsCooldownActive(true);
          }}
          type="button"
        >
          Выслать код еще раз
        </button>
      )}
    </div>
  );
};

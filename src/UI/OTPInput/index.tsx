import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface OTPInputProps {
  onInputFilled?: (code: string) => void;
  hasError?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  onInputFilled,
  hasError = false,
}) => {
  const [otp, setOTP] = React.useState<string[]>(new Array(4).fill(''));
  const [activeInput, setActiveInput] = React.useState<number>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const newOTP: string[] = [...otp];

    newOTP[index] = value.substring(value.length - 1);
    if (!value) setActiveInput(index - 1);
    else setActiveInput(index + 1);

    if (activeInput === otp.length - 1) {
      if (onInputFilled) {
        const code = newOTP.join('');
        onInputFilled(code);
      }
      inputRef.current?.blur();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      document.body.style.zoom = '100%';
    }

    setOTP(newOTP);
  };
  const onFocus = (index: number) => {
    setActiveInput(index);
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [activeInput]);

  return (
    <div className={styles.wrapper}>
      {otp.map((el, index) => (
        <div key={index}>
          <input
            ref={activeInput === index ? inputRef : null}
            className={classNames(
              { [styles['input--error']]: hasError },
              styles.input
            )}
            onChange={(e) => onInput(e, index)}
            value={otp[index]}
            onFocus={() => onFocus(index)}
            type="number"
          />
        </div>
      ))}
    </div>
  );
};

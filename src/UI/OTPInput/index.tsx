import React from 'react';
import styles from './styles.module.scss';

let currentOTPIndex: number = 0;
export const OTPInput: React.FC = () => {
  const [otp, setOTP] = React.useState<string[]>(new Array(4).fill(''));
  const [activeInput, setActiveInput] = React.useState<number>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeInput && activeInput + 1 === otp.length) {
      setActiveInput(activeInput + 1);
    }
    const { value } = e.target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveInput(currentOTPIndex - 1);
    else setActiveInput(currentOTPIndex + 1);

    setOTP(newOTP);
  };
  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (e.key === 'Backspace') setActiveInput(index - 1);
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
            className={styles.input}
            onChange={onInput}
            onKeyDown={(e) => {
              onKeyDown(e, index);
            }}
            type="number"
          />
          {index}
        </div>
      ))}
    </div>
  );
};

export const OTPInputTest: React.FC = () => {
  const [OTP, setOTP] = React.useState<Array<number | null>>(
    new Array(4).fill(null)
  );
  const [activeInputIndex, setActiveInputIndex] = React.useState<number>(0);
  const activeInputRef = React.useRef<HTMLInputElement>(null);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const char = value.substring(value.length - 1);
    const newOtp = [...OTP];
    newOtp[index] = Number(char);

    setActiveInputIndex(index + 1);
    setOTP(newOtp);
  };
  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const key = e.key;
    if (key === 'Backspace') {
      e.currentTarget.value = '';
      const newOTP = [...OTP];
      newOTP[index] = null;
      setOTP(newOTP);
      setActiveInputIndex(index - 1);
    }
  };

  React.useEffect(() => {
    activeInputRef.current?.focus();
  }, [activeInputIndex]);

  return (
    <div className={styles.wrapper}>
      {OTP.map((el, index) => (
        <div key={index}>
          <input
            ref={activeInputIndex === index ? activeInputRef : null}
            className={styles.input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onInput(e, index);
            }}
            onKeyDown={(e) => {
              onKeyDown(e, index);
            }}
            type="number"
          />
          {index}
        </div>
      ))}
    </div>
  );
};

import React, { useContext } from 'react';
import styles from './styles.module.scss';
import { Input } from '../../../../UI/Input';
import { Button } from '../../../../UI/Button';
import { Formik } from 'formik';
import { LogoIcon } from '../../../../assets/icons';
import { ConfirmPhoneSection } from '../ConfirmPhoneSection';
import { useSignMutation } from '../../api/useSignMutation';
import { useGetConfirmationCode } from '../../api/useGetConfirmationCode';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { AuthContext } from '../../context/AuthContext';

interface FormState {
  phone: string;
  isConfirmationStarted: boolean;
  confirmationCode: string | null;
  isPhoneConfirmed: boolean;
}

const initialState: FormState = {
  confirmationCode: null,
  phone: '',
  isConfirmationStarted: false,
  isPhoneConfirmed: false,
};

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const localStorage = useLocalStorage();
  const authContext = useContext(AuthContext);
  const { mutateAsync: signin } = useSignMutation();
  const { mutate: getCode, data: codeData } = useGetConfirmationCode();
  const onSubmitHandler = (values: FormState) => {
    if (values.confirmationCode) {
      signin({
        phone: values.phone,
        verify_code: values.confirmationCode,
      }).then((data) => {
        localStorage.setAuthToken(data.data.token);
        authContext.setAuth(true);
        authContext.setToken(data.data.token);
        navigate('/');
      });
    }
  };

  return (
    <Formik initialValues={initialState} onSubmit={onSubmitHandler}>
      {({ values, handleChange, handleSubmit, setValues, handleReset }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inner}>
            <Input
              name="phone"
              onChange={handleChange}
              placeholder="+79997776655"
              onClear={() => {
                setValues({ ...values, phone: '' });
              }}
            />
            {!values.isConfirmationStarted ? (
              <div className={styles.button}>
                <Button
                  onClick={() => {
                    getCode({ phone: values.phone });
                    setValues({ ...values, isConfirmationStarted: true });
                  }}
                  disabled={!values.phone}
                  variant="outlined"
                  type="button"
                >
                  Подтвердить
                </Button>
              </div>
            ) : null}
          </div>
          {values.isConfirmationStarted ? (
            <ConfirmPhoneSection
              onInputFilled={(code) => {
                setValues({
                  ...values,
                  confirmationCode: code || null,
                  isPhoneConfirmed: code === codeData?.result.code,
                });
              }}
              isPhoneConfirmed={values.isPhoneConfirmed}
              hasError={
                values.confirmationCode !== null &&
                values.confirmationCode !== codeData?.result.code
              }
              onRefreshCode={() => {
                getCode({ phone: values.phone });
              }}
            />
          ) : null}
          <div className={styles.controlls}>
            <div className={styles.controll}>
              <Button
                variant="outlined"
                type="reset"
                onClick={() => setValues(initialState)}
              >
                Отмена
              </Button>
            </div>
            <div className={styles.controll}>
              <Button
                icon={LogoIcon}
                type="submit"
                disabled={!values.isPhoneConfirmed}
              >
                Войти
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

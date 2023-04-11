import React from 'react';
import styles from './styles.module.scss';
import { Input } from '../../../../UI/Input';
import { Button } from '../../../../UI/Button';
import { Formik } from 'formik';
import { LogoIcon } from '../../../../assets/icons';

export const LoginForm: React.FC = () => {
  return (
    <Formik initialValues={{ phone: '' }} onSubmit={() => {}}>
      {({ values, handleChange, setValues, handleReset }) => (
        <form className={styles.form}>
          <div className={styles.inner}>
            <div>
              <Input
                name="phone"
                onChange={handleChange}
                placeholder="+7 (___)___-__-__"
                onClear={() => {
                  setValues({ ...values, phone: '' });
                }}
              />
            </div>
            <div className={styles.button}>
              <Button variant="outlined" type="button">
                Подтвердить
              </Button>
            </div>
          </div>
          <div className={styles.controlls}>
            <div className={styles.controll}>
              <Button variant="outlined" type="reset" onClick={handleReset}>
                Отмена
              </Button>
            </div>
            <div className={styles.controll}>
              <Button icon={LogoIcon} type="submit">
                Войти
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

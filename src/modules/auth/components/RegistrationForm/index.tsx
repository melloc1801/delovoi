import React from 'react';
import { Formik } from 'formik';
import { Input } from '../../../../UI/Input';
import styles from './styles.module.scss';
import { Checkbox } from '../../../../UI/Checkbox';
import { Select } from '../../../../UI/Select';
import { Button } from '../../../../UI/Button';
import { LogoIcon } from '../../../../assets/icons';
import { useNavigate } from 'react-router-dom';

interface FormState {
  lastname: string;
  firstname: string;
  middlename: string;
  hasntMiddlename: boolean;
  city: { key: string; value: string } | null;
  phone: string;
  personalDataProcessing: boolean;
}

const initialState: FormState = {
  lastname: '',
  firstname: '',
  middlename: '',
  hasntMiddlename: false,
  city: null as { key: string; value: string } | null,
  phone: '',
  personalDataProcessing: false,
};

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const onSumbitHandle = async (values: FormState) => {
    await fetch('https://api.jump.finance/services/openapi/contractors', {
      headers: {
        'Client-Key': '3776dd62-0022-42de-90e1-d18cea78971c',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        phone: values.phone,
        last_name: values.lastname,
        first_name: values.firstname,
        middle_name: values.middlename,
        legal_form_id: 2,
        agent_id: 4534,
        group_id: 18743,
      }),
    });
    navigate('/');
  };

  return (
    <div>
      <Formik
        initialValues={initialState}
        onSubmit={(values: FormState) => {
          onSumbitHandle(values);
        }}
      >
        {({ values, handleChange, setValues, handleReset, handleSubmit }) => (
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              onSumbitHandle(values);
            }}
          >
            <div className={styles.top__wrapper}>
              <div>
                <Input
                  name="lastname"
                  placeholder="Фамилия"
                  onChange={handleChange}
                  value={values.lastname}
                  onClear={() => {
                    setValues({ ...values, lastname: '' });
                  }}
                />
              </div>
              <div>
                <Input
                  name="firstname"
                  placeholder="Имя"
                  onChange={handleChange}
                  value={values.firstname}
                  onClear={() => {
                    setValues({ ...values, firstname: '' });
                  }}
                />
              </div>
              <div>
                <Input
                  name="middlename"
                  placeholder="Отчество"
                  onChange={handleChange}
                  value={values.middlename}
                  onClear={() => {
                    setValues({ ...values, middlename: '' });
                  }}
                />
              </div>
              <label
                className={styles.middlename__wrapper}
                onClick={() => {
                  setValues({
                    ...values,
                    hasntMiddlename: !values.hasntMiddlename,
                  });
                }}
              >
                <div className={styles.middlename__checkbox}>
                  <Checkbox
                    isActive={values.hasntMiddlename}
                    onChange={() => {}}
                  />
                </div>
                <div className={styles.middlename}>Нет отчества</div>
              </label>
            </div>
            <div className={styles.bottom__wrapper}>
              <div className={styles.bottom__city}>
                <Select
                  active={values.city ?? undefined}
                  values={[
                    { key: 'MSC', value: 'Moscow' },
                    { key: 'SPB', value: 'Saints-Petersberg' },
                  ]}
                  onSelect={(pair) => {
                    setValues({ ...values, city: pair });
                  }}
                />
              </div>
              <div className={styles.phone__wrapper}>
                <div className={styles.phone__input}>
                  <Input
                    placeholder="+79997776655"
                    name="phone"
                    onChange={handleChange}
                    value={values.phone}
                    onClear={() => {
                      setValues({ ...values, phone: '' });
                    }}
                  />
                </div>
                <div className={styles.phone__button}>
                  <Button variant="outlined" type="button">
                    Подтвердить
                  </Button>
                </div>
              </div>
            </div>
            <label
              className={styles.conditions__wrapper}
              onClick={() => {
                setValues({
                  ...values,
                  personalDataProcessing: !values.personalDataProcessing,
                });
              }}
            >
              <div className={styles.conditions__checkbox}>
                <Checkbox
                  isActive={values.personalDataProcessing}
                  onChange={() => {}}
                />
              </div>
              <div>
                Нажимая на кнопку я даю свое согласие на обработку персональных
                данных и соглашаюсь с условиями Политики конфиденциальности
              </div>
            </label>
            <div className={styles.controlls__wrapper}>
              <div className={styles.controlls__left}>
                <Button onClick={handleReset} variant="outlined" type="reset">
                  Отмена
                </Button>
              </div>
              <div>
                <Button
                  icon={LogoIcon}
                  type="submit"
                  disabled={!values.personalDataProcessing}
                >
                  Зарегистрироваться
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

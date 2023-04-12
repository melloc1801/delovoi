import React from 'react';
import {
  CalendarIcon,
  CloseIcon,
  GeoIcon,
  ListIcon,
} from '../../../../assets/icons';
import { type Pair, Select } from '../../../../UI/Select';
import { Formik } from 'formik';
import styles from './styles.module.scss';
import { useTabs } from '../../../../hooks/useTabs';
import classNames from 'classnames';

interface FormState {
  date: string;
  vacancy: Pair;
}

const selectValues: Pair[] = [
  { key: 'all', value: 'Все вакансии' },
  { key: 'seller', value: 'Продавец' },
  { key: 'sorter', value: 'Сортировщик' },
];

const initialValues: FormState = {
  date: '30.03.2023',
  vacancy: selectValues[0],
};

interface ControllBarProps {
  onChangeViewClick: (view: 'items' | 'maps') => void;
}

export const ControllBar: React.FC<ControllBarProps> = ({
  onChangeViewClick,
}) => {
  const { activeTab, onTabChange } = useTabs(0);

  return (
    <div className={styles.wrapper}>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, setValues, handleReset }) => (
          <div className={styles.filters}>
            <div className={styles.filters__date}>
              30.03.2023 <CalendarIcon width={18} height={18} fill="#87A2BE" />
            </div>
            <div>
              <Select
                values={selectValues}
                onSelect={(vacancy) => {
                  setValues({ ...values, vacancy });
                }}
                active={values.vacancy}
              />
            </div>
            <button
              className={styles.filters__reset}
              onClick={handleReset}
              type="reset"
            >
              <CloseIcon width={20} height={20} fill="#6357AB" />
              Сбросить
            </button>
          </div>
        )}
      </Formik>
      <div className={styles.controlls}>
        <div className={styles.tabs}>
          <button
            className={classNames(
              { [styles['tab--active']]: activeTab === 0 },
              styles.tab
            )}
            onClick={() => {
              onTabChange(0);
              onChangeViewClick('maps');
            }}
          >
            <GeoIcon
              width={20}
              height={20}
              fill={activeTab === 0 ? '#3BF1E2' : '#3C2D96'}
            />
          </button>
          <button
            className={classNames(
              { [styles['tab--active']]: activeTab === 1 },
              styles.tab
            )}
            onClick={() => {
              onTabChange(1);
              onChangeViewClick('items');
            }}
          >
            <ListIcon
              width={20}
              height={20}
              stroke={activeTab === 1 ? '#3BF1E2' : '#3C2D96'}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

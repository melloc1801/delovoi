import React from 'react';
import styles from './styles.module.scss';
import { Logo } from '../../../../UI/Logo';
import { RegistrationForm } from '../RegistrationForm';
import { useTabs } from '../../../../hooks/useTabs';
import classNames from 'classnames';
import { LoginForm } from '../LoginForm';

export const AuthForm: React.FC = () => {
  const { activeTab, onTabChange } = useTabs(0);
  const tabs = ['Вход', 'Регистрация'];

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo__wrapper}>
        <Logo />
        <div className={styles.logo__title}>Деловой</div>
      </div>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={classNames(
              { [styles['tab--active']]: activeTab === index },
              styles.tab
            )}
            onClick={() => {
              onTabChange(index);
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === 0 ? <LoginForm /> : null}
      {activeTab === 1 ? <RegistrationForm /> : null}
    </div>
  );
};

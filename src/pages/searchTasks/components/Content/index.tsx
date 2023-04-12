import React from 'react';
import { Title } from '../../../../UI/Title';
import { ControllBar } from '../ControllBar';
import { SortBar } from '../SortBar';
import { TaskCard } from '../TaskCard';
import styles from './styles.module.scss';
import { useWindowResize } from '../../../../hooks/useWindowResize';
import { TaskCardMobile } from '../TaskCardMobile';
import { useTabs } from '../../../../hooks/useTabs';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';

const items = [
  {
    id: 1,
    organization: {
      name: 'Gloria Jeans',
      avatarUrl: 'https://corp.gloria-jeans.ru/favicon.ico?20131106',
    },
    post: 'Сортировщик',
    address: 'ул. Льва Толстого, 21',
    time: '09:00 – 17:00',
    paymentRate: '120 ₽/час или до 3 456 ₽/день',
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
    isOpenDefault: true,
  },
  {
    id: 2,
    organization: {
      name: 'Название организации',
    },
    post: 'Сортировщик',
    address: 'ул. Льва Толстого, 21',
    time: '09:00 – 17:00',
    paymentRate: '120 ₽/час или до 3 456 ₽/день',
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
    hasDiscount: true,
  },
  {
    id: 3,
    organization: {
      name: 'Gloria Jeans',
      avatarUrl: 'https://corp.gloria-jeans.ru/favicon.ico?20131106',
    },
    post: 'Сортировщик',
    address: 'ул. Льва Толстого, 21',
    time: '09:00 – 17:00',
    paymentRate: '120 ₽/час или до 3 456 ₽/день',
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
  },
  {
    id: 4,
    organization: {
      name: 'Gloria Jeans',
      avatarUrl: 'https://corp.gloria-jeans.ru/favicon.ico?20131106',
    },
    post: 'Сортировщик',
    address: 'ул. Льва Толстого, 21',
    time: '09:00 – 17:00',
    paymentRate: '120 ₽/час или до 3 456 ₽/день',
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
  },
  {
    id: 5,
    organization: {
      name: 'Gloria Jeans',
      avatarUrl: 'https://corp.gloria-jeans.ru/favicon.ico?20131106',
    },
    post: 'Сортировщик',
    address: 'ул. Льва Толстого, 21',
    time: '09:00 – 17:00',
    paymentRate: '120 ₽/час или до 3 456 ₽/день',
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
  },
  {
    id: 6,
    organization: {
      name: 'Gloria Jeans',
      avatarUrl: 'https://corp.gloria-jeans.ru/favicon.ico?20131106',
    },
    post: 'Сортировщик',
    address: 'ул. Льва Толстого, 21',
    time: '09:00 – 17:00',
    paymentRate: '120 ₽/час или до 3 456 ₽/день',
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
  },
  {
    id: 7,
    organization: {
      name: 'Gloria Jeans',
      avatarUrl: 'https://corp.gloria-jeans.ru/favicon.ico?20131106',
    },
    post: 'Сортировщик',
    address: 'ул. Льва Толстого, 21',
    time: '09:00 – 17:00',
    paymentRate: '120 ₽/час или до 3 456 ₽/день',
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
  },
  {
    id: 8,
    organization: {
      name: 'Gloria Jeans',
      avatarUrl: 'https://corp.gloria-jeans.ru/favicon.ico?20131106',
    },
    post: 'Сортировщик',
    address: 'ул. Льва Толстого, 21',
    time: '09:00 – 17:00',
    paymentRate: '120 ₽/час или до 3 456 ₽/день',
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
  },
];

export const Content: React.FC = () => {
  const { size } = useWindowResize();
  const { activeTab, onTabChange } = useTabs(1);

  return (
    <div className={styles.wrapper}>
      <Title>Поиск заданий</Title>
      <ControllBar
        onChangeViewClick={(view) => {
          if (view === 'items') onTabChange(0);
          if (view === 'maps') onTabChange(1);
        }}
      />

      {activeTab === 0 ? (
        <div className={styles.inner}>
          {size > 1024 ? <SortBar /> : null}
          <div className={styles.list}>
            {size > 992
              ? items.map((item) => (
                  <TaskCard
                    key={item.id}
                    organization={item.organization}
                    post={item.post}
                    address={item.address}
                    time={item.time}
                    paymentRate={item.paymentRate}
                    hasDiscount={item.hasDiscount}
                    description={item.description}
                    isOpenDefault={item.isOpenDefault}
                  />
                ))
              : items.map((item) => (
                  <TaskCardMobile
                    key={item.id}
                    organization={item.organization}
                    post={item.post}
                    address={item.address}
                    time={item.time}
                    paymentRate={item.paymentRate}
                    hasDiscount={item.hasDiscount}
                    description={item.description}
                  />
                ))}
          </div>
        </div>
      ) : null}
      {activeTab === 1 ? (
        <YMaps>
          <Map
            width="100%"
            height="360px"
            style={{ flex: '1 1 300px', minHeight: '700px' }}
            defaultState={{ center: [55.75, 37.57], zoom: 12 }}
          >
            <Placemark geometry={[55.65, 37.658521]} />
            <Placemark geometry={[55.75, 37.62]} />
            <Placemark geometry={[55.8, 37.658521]} />
            <Placemark geometry={[55.745, 37.49]} />
            <Placemark geometry={[55.69, 37.55]} />
          </Map>
        </YMaps>
      ) : null}
    </div>
  );
};

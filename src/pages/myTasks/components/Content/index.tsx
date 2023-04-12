import React from 'react';
import { Title } from '../../../../UI/Title';
import { MyTaskCard } from '../../../../components/MyTaskCard';
import styles from './styles.module.scss';

const list = [
  {
    id: 1,
    medCard: true,
    address: 'ул. Льва Толстого, 21',
    arrived: true,
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
    specialConditions:
      'Через сколько и при каких условиях получает после смены',
    organization: { name: 'Магазин без лого' },
    post: 'Сортировщик',
    date: '21 марта 2023 09:00-11:00',
    paymentDescription:
      'Через сколько и при каких условиях получает после смены 120 ₽/час или до 3 456 ₽/день',
    isOpenDefault: true,
  },
  {
    id: 2,
    medCard: true,
    address: 'ул. Льва Толстого, 21',
    arrived: true,
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
    specialConditions:
      'Через сколько и при каких условиях получает после смены',
    organization: { name: 'Магазин без лого' },
    post: 'Сортировщик',
    date: '21 марта 2023 09:00-11:00',
    paymentDescription:
      'Через сколько и при каких условиях получает после смены 120 ₽/час или до 3 456 ₽/день',
  },
  {
    id: 3,
    medCard: true,
    address: 'ул. Льва Толстого, 21',
    arrived: true,
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
    specialConditions:
      'Через сколько и при каких условиях получает после смены',
    organization: { name: 'Магазин без лого' },
    post: 'Сортировщик',
    date: '21 марта 2023 09:00-11:00',
    paymentDescription:
      'Через сколько и при каких условиях получает после смены 120 ₽/час или до 3 456 ₽/день',
  },
  {
    id: 4,
    medCard: true,
    address: 'ул. Льва Толстого, 21',
    arrived: true,
    description:
      'Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым.',
    specialConditions:
      'Через сколько и при каких условиях получает после смены',
    organization: { name: 'Магазин без лого' },
    post: 'Сортировщик',
    date: '21 марта 2023 09:00-11:00',
    paymentDescription:
      'Через сколько и при каких условиях получает после смены 120 ₽/час или до 3 456 ₽/день',
  },
];
export const Content: React.FC = () => {
  return (
    <>
      <Title>Мои задания</Title>
      <div className={styles.list}>
        {list.map((el) => (
          <MyTaskCard
            key={el.id}
            organization={el.organization}
            description={el.description}
            arrived={el.arrived}
            paymentDescription={el.paymentDescription}
            medCard={el.medCard}
            specialConditions={el.specialConditions}
            address={el.address}
            post={el.post}
            date={el.date}
            isOpenDefault={el.isOpenDefault}
          />
        ))}
      </div>
    </>
  );
};

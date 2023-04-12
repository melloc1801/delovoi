import React from 'react';
import { MyTaskCard } from '../../../../components/MyTaskCard';
import { Stats } from '../Stats';

export const Content: React.FC = () => {
  return (
    <>
      <Stats />
      <MyTaskCard
        medCard={true}
        address="ул. Льва Толстого, 21"
        arrived={true}
        description="Gloria Jeans — советская и российская компания, специализирующаяся на производстве и торговле одеждой, обувью и аксессуарами для всей семьи под брендом «Gloria Jeans». Компания была основана в 1988 году Владимиром Мельниковым."
        paymentDescription="Через сколько и при каких условиях получает после смены
120 ₽/час или до 3 456 ₽/день"
        specialConditions="Через сколько и при каких условиях получает после смены"
        organization={{ name: 'Магазин без лого' }}
        post="Сортировщик"
        date="21 марта 2023 09:00-11:00"
        isClosedTask
      />
    </>
  );
};

import React, { useContext } from 'react';
import { useWindowResize } from '../../hooks/useWindowResize';
import { Content } from './components/Content';
import { MainLayout } from '../../components/MainLayout';
import { MainLayoutMobile } from '../../components/MainLayoutMobile';
import { ProfileContext } from '../../modules/profile';

export const HomePage: React.FC = () => {
  const { size } = useWindowResize();
  const profileContext = useContext(ProfileContext);

  return size > 1200 ? (
    <MainLayout {...profileContext}>
      <Content balance={profileContext.balance} />
    </MainLayout>
  ) : (
    <MainLayoutMobile {...profileContext}>
      <Content balance={profileContext.balance} />
    </MainLayoutMobile>
  );
};

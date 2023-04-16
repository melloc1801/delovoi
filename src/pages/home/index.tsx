import React from 'react';
import { useWindowResize } from '../../hooks/useWindowResize';
import { Content } from './components/Content';
import { MainLayout } from '../../components/MainLayout';
import { MainLayoutMobile } from '../../components/MainLayoutMobile';

export const HomePage: React.FC = () => {
  const { size } = useWindowResize();

  return size > 1200 ? (
    <MainLayout>
      <Content />
    </MainLayout>
  ) : (
    <MainLayoutMobile>
      <Content />
    </MainLayoutMobile>
  );
};

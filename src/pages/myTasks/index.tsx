import React from 'react';
import { MainLayout } from '../../components/MainLayout';
import { MainLayoutMobile } from '../../components/MainLayoutMobile';
import { useWindowResize } from '../../hooks/useWindowResize';
import { Content } from './components/Content';

export const MyTasksPage: React.FC = () => {
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

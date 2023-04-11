import React from 'react';

export const useTabs = (initialTab?: number) => {
  const [activeTab, setActiveTab] = React.useState<number | null>(
    initialTab ?? null
  );

  const onTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    onTabChange,
  };
};

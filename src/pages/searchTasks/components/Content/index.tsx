import React, { useContext } from 'react';
import { Title } from '../../../../UI/Title';
import { ControllBar } from '../ControllBar';
import { SortBar } from '../SortBar';
import { TaskCard } from '../TaskCard';
import styles from './styles.module.scss';
import { useWindowResize } from '../../../../hooks/useWindowResize';
import { useTabs } from '../../../../hooks/useTabs';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { formatWorkHours } from '../../../../helpers/formatWorkHours';
import { TaskCardMobile } from '../TaskCardMobile';
import { Button } from '../../../../UI/Button';
import { appConfig } from '../../../../app-config';
import {
  useAcceptTaskMutation,
  useDismissMyTasksMutation,
  useGetTasksQuery,
} from '../../../../modules/tasks';
import { AuthContext } from '../../../../modules/auth';
import { type Pair } from '../../../../UI/Select';

export const Content: React.FC = () => {
  const { size } = useWindowResize();
  const authContext = useContext(AuthContext);
  const { activeTab: activeViewTab, onTabChange: setActiveViewTab } =
    useTabs(0);
  const { data, fetchNextPage, hasNextPage } = useGetTasksQuery(
    authContext.token
  );
  const { mutateAsync: acceptTask } = useAcceptTaskMutation();
  const { mutateAsync: dismissTask } = useDismissMyTasksMutation(
    authContext.token
  );
  const [date, setDate] = React.useState<[Date, Date] | null>(null);
  const [vacancy, setVacancy] = React.useState<Pair>({
    key: 'all',
    value: 'Все вакансии',
  });
  const onSelect = (pair: Pair) => {
    setVacancy({ ...pair });
  };
  const onDateChange = (range: [Date, Date]) => {
    const start =
      range[0].getDate() < new Date().getDate() ? new Date() : range[0];
    const end =
      range[1].getDate() < new Date().getDate() ? new Date() : range[1];

    setDate([start, end]);
  };

  const onReset = () => {
    setDate(null);
    setVacancy({
      key: 'all',
      value: 'Все вакансии',
    });
  };

  return (
    <div className={styles.wrapper}>
      <Title>Поиск заданий</Title>
      <ControllBar
        onChangeViewClick={(view) => {
          if (view === 'items') setActiveViewTab(0);
          if (view === 'maps') setActiveViewTab(1);
        }}
        onSelect={onSelect}
        activeSelect={vacancy}
        onDateChange={onDateChange}
        onReset={onReset}
        value={date}
      />

      {activeViewTab === 0 ? (
        <div className={styles.inner}>
          {size > 1024 ? <SortBar /> : null}
          <div className={styles.list}>
            {size > 992
              ? data?.pages.map((page) =>
                  page.data.map((item) => (
                    <TaskCard
                      key={item.id}
                      organization={{
                        name: item.customer_name,
                        avatarUrl: `${appConfig.imagesPath}${item.customer_logo}`,
                      }}
                      post={item.vacancy}
                      address={item.object}
                      time={formatWorkHours(item.time_start, item.time_end)}
                      paymentRate={`${item.price} ₽/час или до ${item.sum_shift} ₽/день`}
                      hasDiscount={false}
                      description={item.description ?? ''}
                      onAccept={async () =>
                        await acceptTask({
                          taskId: item.id,
                          token: authContext.token ?? '',
                          baseId: item.base_id,
                        })
                      }
                      onDismiss={async () => await dismissTask(item.id)}
                    />
                  ))
                )
              : data?.pages.map((page) =>
                  page.data.map((item) => (
                    <TaskCardMobile
                      key={item.id}
                      organization={{
                        name: item.customer_name,
                        avatarUrl: `${appConfig.imagesPath}${item.customer_logo}`,
                      }}
                      post={item.vacancy}
                      address={item.object}
                      time={formatWorkHours(item.time_start, item.time_end)}
                      paymentRate={`${item.price} ₽/час или до ${item.sum_shift} ₽/день`}
                      hasDiscount={false}
                      description={item.description ?? ''}
                      onAccept={async () =>
                        await acceptTask({
                          taskId: item.id,
                          token: authContext.token ?? '',
                          baseId: item.base_id,
                        })
                      }
                    />
                  ))
                )}
          </div>
          {hasNextPage ? (
            <div className={styles.loadmore}>
              <div className={styles.loadmore__inner}>
                <Button onClick={async () => await fetchNextPage()}>
                  Загрузить еще
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      {activeViewTab === 1 ? (
        <>
          <YMaps>
            <Map
              width="100%"
              height="360px"
              style={{ flex: '1 1 300px', minHeight: '700px' }}
              defaultState={{ center: [55.75, 37.57], zoom: 12 }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            >
              <Placemark geometry={[55.65, 37.658521]} />
              <Placemark geometry={[55.75, 37.62]} />
              <Placemark geometry={[55.8, 37.658521]} />
              <Placemark geometry={[55.745, 37.49]} />
              <Placemark geometry={[55.69, 37.55]} />
            </Map>
          </YMaps>
        </>
      ) : null}
    </div>
  );
};

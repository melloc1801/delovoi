import React, { useContext } from 'react';
import { Title } from '../../../../UI/Title';
import { ControllBar } from '../ControllBar';
import { type Col, SortBar } from '../SortBar';
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
import { queryClient } from '../../../../index';

export const Content: React.FC = () => {
  const { size } = useWindowResize();
  const authContext = useContext(AuthContext);
  const [date, setDate] = React.useState<[Date, Date] | null>(null);
  const [vacancy, setVacancy] = React.useState<Pair>({
    key: 'all',
    value: 'Все вакансии',
  });
  const [sort, setSort] = React.useState<Col>();
  const { activeTab: activeViewTab, onTabChange: setActiveViewTab } =
    useTabs(0);
  const {
    data,
    refetch: refetchTasks,
    fetchNextPage,
    hasNextPage,
  } = useGetTasksQuery(
    authContext.token,
    date ?? undefined,
    vacancy.key === 'all' ? undefined : vacancy.key,
    sort
  );
  const { mutateAsync: acceptTask } = useAcceptTaskMutation();
  const { mutateAsync: dismissTask } = useDismissMyTasksMutation(
    authContext.token
  );

  const onSelectVacancy = async (pair: Pair) => {
    setVacancy({ ...pair });
    await queryClient.invalidateQueries(['tasks']);
    await refetchTasks({});
  };
  const onDateChange = async (range: [Date, Date] | null) => {
    if (!range) {
      setDate(null);
      await queryClient.invalidateQueries(['tasks']);
      await refetchTasks();
      return;
    }

    const start = range[0].getTime() < Date.now() ? new Date() : range[0];
    const end = range[1].getTime() < Date.now() ? new Date() : range[1];

    setDate([start, end]);
    await queryClient.invalidateQueries(['tasks']);
    await refetchTasks();
  };

  const onReset = async () => {
    setDate(null);
    setVacancy({
      key: 'all',
      value: 'Все вакансии',
    });

    await queryClient.invalidateQueries(['tasks']);
    await refetchTasks();
  };

  const onSortHandle = async (col: Col) => {
    setSort(col);
    await queryClient.invalidateQueries(['tasks']);
    await refetchTasks();
  };

  return (
    <div className={styles.wrapper}>
      <Title>Поиск заданий</Title>
      <ControllBar
        onChangeViewClick={(view) => {
          if (view === 'items') setActiveViewTab(0);
          if (view === 'maps') setActiveViewTab(1);
        }}
        onSelect={onSelectVacancy}
        activeSelect={vacancy}
        onDateChange={onDateChange}
        onReset={onReset}
        value={date}
      />

      {activeViewTab === 0 ? (
        <div className={styles.inner}>
          {size > 1024 ? <SortBar active={sort} onSort={onSortHandle} /> : null}
          <div className={styles.list}>
            {size > 992
              ? data?.pages.map((page) =>
                  page.data.map((item, i) => (
                    <TaskCard
                      orderDate={item.order_date}
                      paymentCondition={item.payment}
                      key={`${item.id} ${i}`}
                      organization={{
                        name: item.customer_name,
                        avatarUrl: `${appConfig.imagesPath}${item.customer_logo}`,
                      }}
                      driveway={Boolean(item.driveway)}
                      meals={Boolean(item.meals)}
                      post={item.vacancy}
                      address={item.object}
                      time={formatWorkHours(item.time_start, item.time_end)}
                      paymentRate={`${
                        item.price
                      } ₽/${item.task_type.toLowerCase()} или до ${
                        item.sum_shift
                      } ₽/день`}
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
                  page.data.map((item, i) => (
                    <TaskCardMobile
                      orderDate={item.order_date}
                      paymentCondition={item.payment}
                      key={`${item.id} ${i}`}
                      organization={{
                        name: item.customer_name,
                        avatarUrl: `${appConfig.imagesPath}${item.customer_logo}`,
                      }}
                      post={item.vacancy}
                      address={item.object}
                      time={formatWorkHours(item.time_start, item.time_end)}
                      paymentRate={`${
                        item.price
                      } ₽/${item.task_type.toLowerCase()} или до ${
                        item.sum_shift
                      } ₽/день`}
                      hasDiscount={false}
                      description={item.description ?? ''}
                      onAccept={async () =>
                        await acceptTask({
                          taskId: item.id,
                          token: authContext.token ?? '',
                          baseId: item.base_id,
                        })
                      }
                      driveway={Boolean(item.driveway)}
                      meals={Boolean(item.meals)}
                      onDismiss={async () => await dismissTask(item.id)}
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
            >
              <Placemark
                geometry={[55.65, 37.658521]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref:
                    'https://api.delovoi.me/images/logo/GJ_mini.svg',
                  iconImageSize: [60, 60],
                }}
                properties={{
                  // balloonContent: '<div id="driver-2" class="driver-card"></div>',
                  hintContent: '<b> Я появляюсь при наведении на метку </b>',
                  balloonContentHeader: 'Балун метки',
                  balloonContentBody: 'Содержимое <em>балуна</em> метки',
                  balloonContentFooter: 'Подвал',
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              />
              <Placemark
                geometry={[55.75, 37.62]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref:
                    'https://api.delovoi.me/images/logo/GJ_mini.svg',
                  iconImageSize: [60, 60],
                }}
                properties={{
                  // balloonContent: '<div id="driver-2" class="driver-card"></div>',
                  hintContent: '<b> Я появляюсь при наведении на метку </b>',
                  balloonContentHeader: 'Балун метки',
                  balloonContentBody: 'Содержимое <em>балуна</em> метки',
                  balloonContentFooter: 'Подвал',
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              />
              <Placemark
                geometry={[55.8, 37.658521]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref:
                    'https://api.delovoi.me/images/logo/GJ_mini.svg',
                  iconImageSize: [60, 60],
                }}
                properties={{
                  // balloonContent: '<div id="driver-2" class="driver-card"></div>',
                  hintContent: '<b> Я появляюсь при наведении на метку </b>',
                  balloonContentHeader: 'Балун метки',
                  balloonContentBody: 'Содержимое <em>балуна</em> метки',
                  balloonContentFooter: 'Подвал',
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              />
              <Placemark
                geometry={[55.745, 37.49]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref:
                    'https://api.delovoi.me/images/logo/GJ_mini.svg',
                  iconImageSize: [60, 60],
                }}
                properties={{
                  // balloonContent: '<div id="driver-2" class="driver-card"></div>',
                  hintContent: '<b> Я появляюсь при наведении на метку </b>',
                  balloonContentHeader: 'Балун метки',
                  balloonContentBody: 'Содержимое <em>балуна</em> метки',
                  balloonContentFooter: 'Подвал',
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              />
              <Placemark
                geometry={[55.69, 37.55]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref:
                    'https://api.delovoi.me/images/logo/GJ_mini.svg',
                  iconImageSize: [60, 60],
                }}
                properties={{
                  // balloonContent: '<div id="driver-2" class="driver-card"></div>',
                  hintContent: '<b> Я появляюсь при наведении на метку </b>',
                  balloonContentHeader: 'Балун метки',
                  balloonContentBody: 'Содержимое <em>балуна</em> метки',
                  balloonContentFooter: 'Подвал',
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              />
            </Map>
          </YMaps>
        </>
      ) : null}
    </div>
  );
};

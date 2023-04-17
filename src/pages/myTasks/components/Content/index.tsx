import React from 'react';
import { Title } from '../../../../UI/Title';
import { MyTaskCard } from '../../../../components/MyTaskCard';
import styles from './styles.module.scss';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { appConfig } from '../../../../app-config';
import { formatDateIntoMyTaskFormat } from '../../../../helpers/formatDateIntoMyTaskFormat';
import { Button } from '../../../../UI/Button';
import { useGetMyTasksQuery } from '../../../../modules/tasks';

export const Content: React.FC = () => {
  const ls = useLocalStorage();
  const { data, fetchNextPage, hasNextPage } = useGetMyTasksQuery(
    ls.getAuthToken()
  );

  return (
    <>
      <Title>Мои задания</Title>
      <div className={styles.list}>
        {data?.pages.map((page, pageIndex) =>
          page.data.map((item, itemIndex) => (
            <MyTaskCard
              key={item.id}
              id={item.id}
              organization={{
                name: item.customer_name,
                avatarURL: appConfig.imagesPath + item.customer_logo,
              }}
              description={item.description ?? ''}
              arrived={true}
              paymentDescription={`${item.price} ₽/час или до ${item.sum_shift} ₽/день`}
              medCard={Boolean(item.medbook)}
              specialConditions={item.special_conditions}
              address={item.object}
              post={item.vacancy}
              date={formatDateIntoMyTaskFormat(
                item.order_date,
                item.time_start,
                item.time_end
              )}
              latitude={item.latitude}
              longtitude={item.longitude}
              isOpenDefault={pageIndex === 0 && itemIndex === 0}
              status={item.status}
            />
          ))
        )}
      </div>
      {hasNextPage ? (
        <div className={styles.loadmore}>
          <div className={styles.loadmore__inner}>
            <Button onClick={async () => await fetchNextPage()}>
              Подгрузить еще
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

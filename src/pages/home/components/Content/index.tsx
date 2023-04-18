import React, { useContext } from 'react';
import { MyTaskCard } from '../../../../components/MyTaskCard';
import { Stats } from '../Stats';
import { useGetClosestTaskQuery } from '../../api/useGetClosestTaskQuery';
import { AuthContext, useSignoutMutation } from '../../../../modules/auth';
import { appConfig } from '../../../../app-config';
import { formatDateIntoMyTaskFormat } from '../../../../helpers/formatDateIntoMyTaskFormat';
import { Button } from '../../../../UI/Button';
import { LogoIcon } from '../../../../assets/icons';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { useWindowResize } from '../../../../hooks/useWindowResize';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

interface ContentProps {
  balance: number;
}

export const Content: React.FC<ContentProps> = ({ balance }) => {
  const authContext = useContext(AuthContext);

  const ls = useLocalStorage();
  const { data } = useGetClosestTaskQuery(authContext.token ?? '');
  const { mutateAsync } = useSignoutMutation();
  const { size } = useWindowResize();

  const onLogoutHandle = () => {
    if (authContext.token) {
      mutateAsync(authContext.token).then(() => {
        authContext.setAuth(false);
        authContext.setToken('');
        ls.removeToken();
      });
    }
  };

  return (
    <>
      <Stats balance={balance} />
      {data?.length ? (
        data?.map((item) => (
          <>
            <MyTaskCard
              key={item.id}
              id={item.id}
              medCard={Boolean(item.medbook)}
              address={item.object}
              arrived={true}
              description={item.description ?? ''}
              paymentDescription={`${item.price} ₽/час или до ${item.sum_shift} ₽/день`}
              specialConditions={item.special_conditions}
              organization={{
                name: item.customer_name,
                avatarURL: appConfig.imagesPath + item.customer_logo,
              }}
              post={item.vacancy}
              date={formatDateIntoMyTaskFormat(
                item.order_date,
                item.time_start,
                item.time_end
              )}
              status={item.status}
              isClosedTask
              longtitude={item.longitude}
              latitude={item.latitude}
            />
            {size < 992 ? (
              <Button onClick={onLogoutHandle} variant="outlined">
                Выйти
              </Button>
            ) : null}
          </>
        ))
      ) : (
        <div className={styles.empty}>
          <div className={styles.empty__title}>Ваша ближайшая запись</div>
          <div className={styles.empty__subtitle}>
            Вы пока не записаны на задания
          </div>
          <div>
            <Link to="/search">
              <Button icon={LogoIcon}>Найти задание</Button>
            </Link>
          </div>
          {size < 992 ? (
            <>
              {data?.length ? (
                <Button icon={LogoIcon} disabled>
                  Начать выполнять задание
                </Button>
              ) : null}
              <Button onClick={onLogoutHandle} variant="outlined">
                Выйти
              </Button>
            </>
          ) : null}
          <div></div>
        </div>
      )}
    </>
  );
};

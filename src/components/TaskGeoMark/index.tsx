import React from 'react';
import { type YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';

interface TaskGeoMark {
  id: number;
  previewText: (orderId: string) => void;
  mapInstanceRef: YMapsApi | null;
}

export const TaskGeoMark: React.FC<TaskGeoMark> = ({
  id,
  previewText,
  mapInstanceRef,
}) => {
  return <div>TaskGeoMark</div>;
};

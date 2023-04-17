import { type Task } from './model/Task';
import { useAcceptTaskMutation } from './api/useAcceptTaskMutation';
import { useDismissMyTasksMutation } from './api/useDismissMyTasksMutation';
import { useGetMyTasksQuery } from './api/useGetMyTasksQuery';
import { useGetTasksQuery } from './api/useGetTasksQuery';
import { useGetVacanciesQuery } from './api/useGetVacanciesQuery';
import { type MyTask } from './model/MyTask';

export {
  useGetTasksQuery,
  useAcceptTaskMutation,
  useDismissMyTasksMutation,
  useGetMyTasksQuery,
  useGetVacanciesQuery,
  type Task,
  type MyTask,
};

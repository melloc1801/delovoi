import { type Task } from './Task';

export interface MyTask extends Task {
  latitude: string;
  longitude: string;
  status: string;
}

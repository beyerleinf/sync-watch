import {User} from './user';

export interface Room {
  id: string;
  exists: boolean;
  users: User[];
  currentVideo?: string;
  roomMaster?: string;
}

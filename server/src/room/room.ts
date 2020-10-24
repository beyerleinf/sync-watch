import * as Chance from 'chance';
import * as SocketIO from 'socket.io';
import { UserRole } from '../enums';
import { User } from '../models';

const chance = new Chance();

export class Room {
  private _users: User[];
  private _id: string;
  private _name: string;
  private _namespace: SocketIO.Namespace;

  constructor(id: string, namespace: SocketIO.Namespace) {
    this._id = id;
    this._name = `${chance.city()}, ${chance.country({ full: true })}`;
    this._namespace = namespace;
    this._users = [];
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get users(): User[] {
    return this._users;
  }

  join(id: string) {
    const name = `${chance.profession({ rank: true })} ${chance.first()}`;
    this._users.push({
      id,
      name,
      role: UserRole.viewer,
    });
  }

  setUserRole(id: string, role: UserRole) {
    const index = this._users.findIndex(user => user.id === id);

    if (index > -1) {
      this._users[index].role = role;
    }
  }
}

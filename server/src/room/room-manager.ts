import { Room } from './room';
import * as shortid from 'shortid';

export class RoomManager {
  private static rooms: Room[] = [];

  static io: SocketIO.Server;

  static createRoom(): Room {
    const id = shortid.generate();
    const room = new Room(id, RoomManager.io.to(`ROOM::${id}`));
    RoomManager.rooms.push(room);
    return room;
  }

  static getRoom(id: string): Room | undefined {
    return RoomManager.rooms.find(room => room.id === id);
  }
}

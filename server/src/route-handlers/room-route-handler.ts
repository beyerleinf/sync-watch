import {Request, Response} from 'express';

export class RoomRouteHandler {
  static async getRooms(req: Request, res: Response) {
    res.json([]);
  }
}

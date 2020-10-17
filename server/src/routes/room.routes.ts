import {Router} from 'express';
import {RoomRouteHandler} from '../route-handlers';

const router: Router = Router();

router.get('/rooms', RoomRouteHandler.getRooms);

export default router;

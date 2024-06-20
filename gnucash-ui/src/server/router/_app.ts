import { t } from '@/utils/trpc-server';
import { rackRouter } from './rack';
import { shelfRouter } from './shelf';
import { luggageRouter } from './luggage';
import { userRouter } from './user';


export const appRoutes = t.router({  
  rack: rackRouter,
  shelf: shelfRouter,
  luggage: luggageRouter,
  user: userRouter

});

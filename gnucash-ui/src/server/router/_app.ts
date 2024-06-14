import { t } from '@/utils/trpc-server';
import { rackRouter } from './rack';
import { shelfRouter } from './shelf';
import { luggageRouter } from './luggage';


export const appRoutes = t.router({  
  rack: rackRouter,
  shelf: shelfRouter,
  luggage: luggageRouter
});

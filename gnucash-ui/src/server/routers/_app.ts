import { t } from '@/utils/trpc-server';
import { rackRouter } from './rack';
import { shelfRouter } from './shelf';
import { luggageRouter } from './luggage';
import { userRouter } from './user';
import { countryRouter } from './country';
import { carbonFootprintRouter } from './carbon-fp';
import { todoRouter } from './todo';

export const appRoutes = t.router({  
  rack: rackRouter,
  shelf: shelfRouter,
  luggage: luggageRouter,
  user: userRouter,
  country: countryRouter,
  carbonFootprint: carbonFootprintRouter,
  todo: todoRouter
});

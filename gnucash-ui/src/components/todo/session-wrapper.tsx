import { authOptions } from '@/lib/auth-options';

import { getServerSession } from 'next-auth';
import LoaderListItem from '../ui/lists/loader-list';
import AppWrapper from './app-wrapper';

export default async function SessionWrapper({ children }: any) {
  const session = await getServerSession(authOptions);

    return (
      <div className='text-gray-800 '>
        <AppWrapper session={session}>{children}</AppWrapper>
      </div>
    );
  
}

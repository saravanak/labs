import { authOptions } from '@/lib/auth-options';

import AppWrapper from './app-wrapper';
import { getServerSession } from 'next-auth';

export default async function SessionWrapper({ children }: any) {
  const session = await getServerSession(authOptions);

    return (
      <div className='text-gray-800 '>
        <AppWrapper session={session}>{children}</AppWrapper>
      </div>
    );
}

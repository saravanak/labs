'use client';
import CarbonFootprintCalculator from '@/components/ecowise/carbon-footprint';
import { QueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const queryClient = new QueryClient();

export default function FoorPrintPage() {
  const router = useRouter();
  const pathName = usePathname();

  const { data: session, status } = useSession();

  if (status == 'loading') {
    return <h1>Logging you into the app.... </h1>;
  }

  if (status == 'unauthenticated') {
    router.push(`/api/auth/signin/email?callbackUrl=${pathName}`);
  }

  if (status == 'authenticated') {
    return <CarbonFootprintCalculator />;
  }
}

import { getSession } from '@/lib/session-helpers';
import { LandingPage } from '@/features/marketing/components/landing-page';

export default async function Home() {
  const session = await getSession();
  const isAuthenticated = !!session?.user;

  return <LandingPage isAuthenticated={isAuthenticated} />;
}

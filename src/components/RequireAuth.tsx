import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace('/auth/signin');
    }
  }, [user, router]);

  if (!user) return <div className="p-6">Redirecting to sign in...</div>;
  return <>{children}</>;
} 
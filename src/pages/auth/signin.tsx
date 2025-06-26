import { useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/router';

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <div className="card p-8 rounded-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-400 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button type="submit" className="btn text-lg mt-2">Sign In</button>
        </form>
      </div>
    </div>
  );
} 
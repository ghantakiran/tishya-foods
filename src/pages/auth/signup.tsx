import { useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/router';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      router.push('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
      setError(errorMessage);
    }
  };

  return (
    <main className="bg-white min-h-screen py-16">
      <section className="container mx-auto px-4 flex flex-col items-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border p-3 rounded-xl text-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border p-3 rounded-xl text-lg"
                required
              />
              {error && <div className="text-red-500 text-center">{error}</div>}
              <button type="submit" className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors duration-200 text-lg mt-2">Sign Up</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
} 
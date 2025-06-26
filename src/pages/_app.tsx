import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../components/AuthProvider';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NavBar />
      <main className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
        <Footer />
      </main>
    </AuthProvider>
  );
}

export default MyApp; 
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, status } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: email.trim(),
        password,
      });
      navigate('/');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to log in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#120a07] text-[#f5e6d3] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-[#4f3728] bg-[#1c110c]/95 shadow-2xl shadow-black/40 overflow-hidden">
        <div className="px-8 py-10 bg-gradient-to-b from-[#2c1b14] to-[#1c110c] border-b border-[#4f3728]">
          <p className="text-xs tracking-[0.5em] uppercase text-[#c8ab8d]">Vintage Photobooth</p>
          <h1 className="mt-4 text-4xl md:text-5xl">Welcome Back</h1>
          <p className="mt-3 text-sm text-[#d8c3ad] leading-6">
            Sign in to manage your session, keep your identity ready, and move back into the booth.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          <label className="block space-y-2">
            <span className="text-xs tracking-[0.3em] uppercase text-[#c8ab8d]">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className="w-full rounded-xl border border-[#5d4433] bg-[#120a07] px-4 py-3 text-[#f5e6d3] outline-none transition focus:border-[#b28a63]"
              placeholder="you@example.com"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs tracking-[0.3em] uppercase text-[#c8ab8d]">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-[#5d4433] bg-[#120a07] px-4 py-3 text-[#f5e6d3] outline-none transition focus:border-[#b28a63]"
              placeholder="••••••••"
            />
          </label>

          {errorMessage ? (
            <p className="rounded-xl border border-[#8b4c44] bg-[#3a1d17] px-4 py-3 text-sm text-[#ffd7cf]">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting || status === 'loading'}
            className="w-full rounded-xl bg-[#4a3828] px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#f5e6d3] transition hover:bg-[#5a4838] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing In...' : 'Login'}
          </button>

          <p className="text-center text-sm text-[#d8c3ad]">
            New here?{' '}
            <Link to="/signup" className="text-[#f0c48f] underline decoration-[#f0c48f]/60 underline-offset-4">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
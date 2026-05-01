import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isAuthenticated, status } = useAuth();
  const [name, setName] = useState('');
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

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please fill out your name, email, and password.');
      return;
    }

    if (password.trim().length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      await signup({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      navigate('/');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to create your account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#120a07] text-[#f5e6d3] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-[#4f3728] bg-[#1c110c]/95 shadow-2xl shadow-black/40 overflow-hidden">
        <div className="px-8 py-10 bg-gradient-to-b from-[#2c1b14] to-[#1c110c] border-b border-[#4f3728]">
          <p className="text-xs tracking-[0.5em] uppercase text-[#c8ab8d]">Vintage Photobooth</p>
          <h1 className="mt-4 text-4xl md:text-5xl">Create Account</h1>
          <p className="mt-3 text-sm text-[#d8c3ad] leading-6">
            Set up your profile so your booth sessions can be tied to a user account on your backend.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          <label className="block space-y-2">
            <span className="text-xs tracking-[0.3em] uppercase text-[#c8ab8d]">Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              className="w-full rounded-xl border border-[#5d4433] bg-[#120a07] px-4 py-3 text-[#f5e6d3] outline-none transition focus:border-[#b28a63]"
              placeholder="Your name"
            />
          </label>

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
              autoComplete="new-password"
              className="w-full rounded-xl border border-[#5d4433] bg-[#120a07] px-4 py-3 text-[#f5e6d3] outline-none transition focus:border-[#b28a63]"
              placeholder="At least 8 characters"
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
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-center text-sm text-[#d8c3ad]">
            Already registered?{' '}
            <Link to="/login" className="text-[#f0c48f] underline decoration-[#f0c48f]/60 underline-offset-4">
              Login instead
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
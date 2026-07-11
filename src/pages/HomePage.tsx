import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { Link } from 'react-router-dom';
import { FilmStrip } from "../components/FilmStrip";
import { FilmFlicker } from "../components/FilmFlicker";
import { FilmArtifacts } from "../components/FilmArtifacts";
import { useAuth } from '../auth/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleCapture = () => {
    navigate('/camera');
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div
      className="relative w-full min-h-[100dvh] bg-[#1a0f0a] overflow-x-hidden overflow-y-auto flex items-center justify-center"
      style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 16px)', paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)' }}
    >
      {/* Flickering overlay effect */}
      {!Capacitor.isNativePlatform() && <FilmFlicker />}

      {/* Film artifacts (scratches, dust, lines) */}
      {!Capacitor.isNativePlatform() && <FilmArtifacts />}

      {/* Film strip borders - desktop: left/right, mobile: top/bottom */}
      {!Capacitor.isNativePlatform() && (
        <>
          <FilmStrip side="left" />
          <FilmStrip side="right" />
          <FilmStrip side="top" />
          <FilmStrip side="bottom" />
        </>
      )}

      {/* Main content area */}
      <div className="relative z-40 w-full max-w-xl px-4 py-8 text-center sm:px-6 md:py-0 md:max-w-2xl">
        <h1 className="text-[#f5e6d3] tracking-wide text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-3 leading-none">
          Vintage Photobooth
        </h1>

        <p className="mx-auto mt-3 max-w-md text-[0.68rem] leading-6 sm:text-sm md:text-base text-[#d8c3ad] tracking-[0.14em] sm:tracking-[0.18em] uppercase px-2">
          {user ? `Welcome back, ${user.name}` : 'Sign in to save your session or create a new account.'}
        </p>

        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
          <button
            onClick={handleCapture}
            className="w-full sm:w-auto px-6 sm:px-10 py-3.5 bg-[#4a3828] hover:bg-[#5a4838] rounded-md text-[#f5e6d3] tracking-[0.18em] sm:tracking-[0.3em] transition-all uppercase text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl"
          >
            Capture Photo ❤︎
          </button>

          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#7a6048] text-[#f5e6d3] rounded-md tracking-[0.18em] sm:tracking-[0.25em] uppercase text-xs sm:text-sm font-semibold transition-all hover:bg-[#2a1b13]"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#7a6048] text-[#f5e6d3] rounded-md tracking-[0.18em] sm:tracking-[0.25em] uppercase text-xs sm:text-sm font-semibold transition-all hover:bg-[#2a1b13]"
          >
            Sign Up
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#a88b6d] text-[#f5e6d3] rounded-md tracking-[0.18em] sm:tracking-[0.25em] uppercase text-xs sm:text-sm font-semibold transition-all hover:bg-[#2a1b13]"
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

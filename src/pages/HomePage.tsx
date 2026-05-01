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
    <div className="relative w-full h-screen bg-[#1a0f0a] overflow-hidden flex items-center justify-center" style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 60px)' }}>
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
      <div className="relative z-40 text-center px-4">
        <h1 className="text-[#f5e6d3] tracking-wide text-5xl md:text-7xl lg:text-8xl mb-4">
          Vintage Photobooth
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm md:text-base text-[#d8c3ad] tracking-[0.18em] uppercase">
          {user ? `Welcome back, ${user.name}` : 'Sign in to save your session or create a new account.'}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCapture}
            className="px-10 py-4 bg-[#4a3828] hover:bg-[#5a4838] rounded-md text-[#f5e6d3] tracking-[0.3em] transition-all uppercase text-sm font-semibold shadow-lg hover:shadow-xl"
          >
            Capture Photo ❤︎
          </button>

          <Link
            to="/login"
            className="px-8 py-4 border border-[#7a6048] text-[#f5e6d3] rounded-md tracking-[0.25em] uppercase text-sm font-semibold transition-all hover:bg-[#2a1b13]"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-8 py-4 border border-[#7a6048] text-[#f5e6d3] rounded-md tracking-[0.25em] uppercase text-sm font-semibold transition-all hover:bg-[#2a1b13]"
          >
            Sign Up
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="px-8 py-4 bg-transparent border border-[#a88b6d] text-[#f5e6d3] rounded-md tracking-[0.25em] uppercase text-sm font-semibold transition-all hover:bg-[#2a1b13]"
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

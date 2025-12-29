import { useNavigate } from 'react-router-dom';
import { FilmStrip } from "../components/FilmStrip";
import { FilmFlicker } from "../components/FilmFlicker";
import { FilmArtifacts } from "../components/FilmArtifacts";

export default function HomePage() {
  const navigate = useNavigate();

  const handleCapture = () => {
    navigate('/camera');
  };

  return (
    <div className="relative w-full h-screen bg-[#1a0f0a] overflow-hidden flex items-center justify-center">
      {/* Flickering overlay effect */}
      <FilmFlicker />

      {/* Film artifacts (scratches, dust, lines) */}
      <FilmArtifacts />

      {/* Film strip borders - desktop: left/right, mobile: top/bottom */}
      <FilmStrip side="left" />
      <FilmStrip side="right" />
      <FilmStrip side="top" />
      <FilmStrip side="bottom" />

      {/* Main content area */}
      <div className="relative z-40 text-center px-4 sm:px-6 md:px-8">
        <h1 className="text-[#f5e6d3] tracking-wide text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-3 sm:mb-4 leading-tight">
          Vintage Photobooth
        </h1>

        {/* Capture button */}
        <button 
          onClick={handleCapture}
          className="mt-6 sm:mt-8 md:mt-12 px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-[#4a3828] hover:bg-[#5a4838] active:bg-[#3a2818] rounded-md text-[#f5e6d3] tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] transition-all uppercase text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl"
        >
          Capture Photo ❤︎
        </button>
      </div>
    </div>
  );
}

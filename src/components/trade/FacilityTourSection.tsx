import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Volume2,
  VolumeX,
  Factory,
  Warehouse,
  ShieldCheck,
  Scale,
  Truck,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface VideoPlayerCardProps {
  id: string;
  src: string;
  title: string;
  badge: string;
  tag: string;
  description: string;
  specs: { label: string; value: string }[];
  icon: React.ReactNode;
}

const VideoPlayerCard: React.FC<VideoPlayerCardProps> = ({
  src,
  title,
  badge,
  tag,
  description,
  specs,
  icon
}) => {
  // Do NOT autoplay until user manually starts it
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Fallback if browser blocks unmuted audio on start
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play();
            setIsPlaying(true);
          }
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-cream-300 shadow-lg flex flex-col hover:shadow-xl transition-all duration-300">
      {/* Compact Video Viewport Container */}
      <div
        onClick={togglePlay}
        className="relative aspect-video w-full max-h-[220px] sm:max-h-[260px] overflow-hidden bg-forest-950 group cursor-pointer"
      >
        <video
          ref={videoRef}
          src={src}
          preload="metadata"
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent pointer-events-none" />

        {/* Live Facility Badge in Corner */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest-950/85 backdrop-blur-md border border-mustard-500/50 text-mustard-300 text-[10px] font-bold tracking-wide uppercase shadow">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>{badge}</span>
          </div>
        </div>

        {/* Corner Controls (visible when playing or hovered) */}
        {isPlaying && (
          <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={toggleMute}
              className="w-7 h-7 rounded-full bg-forest-900/80 hover:bg-forest-800 text-cream-50 flex items-center justify-center transition backdrop-blur-md border border-forest-700 cursor-pointer shadow"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={handleFullscreen}
              className="w-7 h-7 rounded-full bg-forest-900/80 hover:bg-forest-800 text-cream-50 flex items-center justify-center transition backdrop-blur-md border border-forest-700 cursor-pointer shadow hidden sm:flex"
              title="Watch Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Prominent Play Overlay when Video is Not Playing */}
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-forest-950/35 backdrop-blur-[2px] transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-mustard-500 hover:bg-mustard-400 text-forest-950 flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110 active:scale-95 border-2 border-white/80">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 translate-x-0.5 fill-forest-950 text-forest-950" />
            </div>
            <span className="mt-2.5 px-3 py-1 rounded-full bg-forest-950/80 text-cream-50 text-[11px] font-bold tracking-wide uppercase border border-white/20 shadow">
              Click to Start Video
            </span>
          </div>
        )}

        {/* Bottom Title on Video */}
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 text-mustard-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
            {icon}
            <span>{tag}</span>
          </div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-cream-50 leading-snug line-clamp-1">
            {title}
          </h3>
        </div>
      </div>

      {/* Compact Card Content & Specs */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Technical Specs Metric Pills */}
        <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-cream-200">
          {specs.map((s, idx) => (
            <div key={idx} className="bg-cream-100/70 rounded-xl p-2 text-center border border-cream-200/80">
              <span className="block text-[9px] text-slate-500 uppercase font-semibold leading-tight">
                {s.label}
              </span>
              <span className="font-bold text-forest-950 text-xs block truncate mt-0.5">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FacilityTourSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-cream-100/60 via-cream-50 to-cream-100/60 py-12 sm:py-16 border-y border-cream-300/80 w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Compact Spacing */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 border border-mustard-500/40 text-mustard-300 text-[11px] font-bold tracking-wider uppercase mb-2 shadow-xs">
            <Factory className="w-3.5 h-3.5 text-mustard-400 shrink-0" />
            <span>Verified Manufacturing Infrastructure</span>
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-forest-950 tracking-tight leading-tight mb-2">
            See Our Mill Facility & Working Style in Action
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Click on any video below to inspect our automated expeller crushing lines and large-scale godown storage at our Alwar, Rajasthan plants.
          </p>
        </div>

        {/* Compact 2-Column Video Cards Grid (max-w-4xl) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch mb-8 max-w-4xl mx-auto">
          {/* Card 1: Facility Oil Processing Equipment */}
          <VideoPlayerCard
            id="video-processing"
            src="/videos/facility-oil-processing.mp4"
            badge="EXPELLER UNIT"
            tag="Extraction Machinery"
            title="Industrial Oil Crushing & Expellers"
            description="Our primary crushing plant operates heavy-duty expellers with automated feed screws and enclosed volumetric channels for cold mechanical extraction."
            icon={<Factory className="w-3.5 h-3.5 text-mustard-400" />}
            specs={[
              { label: 'Crushing Scale', value: '120 MT/Day' },
              { label: 'Extraction', value: 'Cold Ghani' },
              { label: 'Standard', value: 'Agmark Gr-1' }
            ]}
          />

          {/* Card 2: Warehouse Storage Bags */}
          <VideoPlayerCard
            id="video-warehouse"
            src="/videos/warehouse-storage-bags.mp4"
            badge="STORAGE GODOWN"
            tag="Warehouse & Ready Stocks"
            title="Raw Material & Bagged Storage"
            description="Sanitized, moisture-monitored godowns holding thousands of double-stitched 50 kg gunny bags of graded seeds and cattle feed khali."
            icon={<Warehouse className="w-3.5 h-3.5 text-mustard-400" />}
            specs={[
              { label: 'Holding Scale', value: '10,000+ Bags' },
              { label: 'Moisture', value: '< 6.5% Max' },
              { label: 'Dispatches', value: 'Same-Day FTL' }
            ]}
          />
        </div>

        {/* Highlights Banner & Direct Action CTA - Compact */}
        <div className="bg-forest-950 text-cream-50 rounded-2xl p-5 sm:p-7 border border-forest-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-5 max-w-4xl mx-auto">
          <div className="space-y-1.5 text-center md:text-left max-w-lg">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px] text-mustard-300 font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-mustard-400 shrink-0" />
                <span>FSSAI Certified Works</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-mustard-400 shrink-0" />
                <span>Digital Weighbridge</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-mustard-400 shrink-0" />
                <span>All-India Fleet</span>
              </span>
            </div>
            <h3 className="font-serif font-bold text-lg text-cream-50">
              Want to Schedule a Mill Inspection or Place a Bulk Order?
            </h3>
            <p className="text-slate-300 text-xs">
              Distributors and bulk buyers are welcome to tour our Rajasthan mill premises or request batch lab test certificates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
            <Link
              to="/quotation-request"
              className="px-5 py-3 rounded-xl bg-mustard-500 hover:bg-mustard-400 text-forest-950 font-bold text-xs tracking-wide transition shadow-md flex items-center justify-center gap-2 text-center"
            >
              <span>Request Proforma</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('open-trade-chatbot', {
                    detail: { query: 'Tell me about the mill facility, crushing capacity and factory inspection' }
                  })
                )
              }
              className="px-4 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-100 font-bold text-xs tracking-wide transition border border-forest-700 flex items-center justify-center gap-1.5 text-center cursor-pointer"
            >
              <span>💬 Ask AI</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

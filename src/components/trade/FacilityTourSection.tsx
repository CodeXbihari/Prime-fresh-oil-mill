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
  Maximize2,
  PhoneCall
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
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
    <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col group">
      {/* Video Screen Container */}
      <div
        className="relative aspect-video sm:h-52 md:h-56 w-full bg-[#0A1D15] overflow-hidden cursor-pointer select-none"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase glass-pill-dark text-[#F5C542]">
            {badge}
          </span>
          {isPlaying && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-emerald-700/90 text-white backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Live Footage
            </span>
          )}
        </div>

        {/* Floating Controls When Playing */}
        {isPlaying && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-30">
            <button
              type="button"
              onClick={toggleMute}
              className="w-7 h-7 rounded-lg glass-pill-dark hover:bg-black/80 text-[#FFF8E8] flex items-center justify-center transition cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={handleFullscreen}
              className="w-7 h-7 rounded-lg glass-pill-dark hover:bg-black/80 text-[#FFF8E8] flex items-center justify-center transition cursor-pointer hidden sm:flex"
              title="Watch Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Play Overlay when Not Playing */}
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/40 backdrop-blur-xs transition-all">
            <div className="w-13 h-13 rounded-full bg-[#E5A000] hover:bg-[#F5C542] text-[#102B20] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 active:scale-95 border border-white/40">
              <Play className="w-5 h-5 translate-x-0.5 fill-[#102B20] text-[#102B20]" />
            </div>
            <span className="mt-2.5 px-3 py-1 rounded-xl glass-pill-dark text-[#FFF8E8] text-[10px] font-semibold tracking-wider uppercase">
              Click to Play Facility Footage
            </span>
          </div>
        )}

        {/* Bottom Title on Video */}
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 text-white z-10 pointer-events-none bg-gradient-to-t from-black/85 via-black/45 to-transparent">
          <div className="flex items-center gap-1.5 text-[#F5C542] text-[10px] font-bold uppercase tracking-wider mb-0.5">
            {icon}
            <span>{tag}</span>
          </div>
          <h3 className="font-serif font-bold text-sm sm:text-base text-white leading-snug line-clamp-1">
            {title}
          </h3>
        </div>
      </div>

      {/* Compact Card Content & Specs */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Technical Specs Metric Pills in Frosted Glass */}
        <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-white/60">
          {specs.map((s, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-xs rounded-xl p-2 text-center border border-white/70 shadow-xs">
              <span className="block text-[9px] text-slate-500 uppercase font-semibold leading-tight">
                {s.label}
              </span>
              <span className="font-bold text-[#102B20] text-xs block truncate mt-0.5">
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
    <section className="py-16 sm:py-24 border-y border-white/50 w-full relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#C49A32] text-xs font-semibold tracking-wider uppercase mb-2.5">
            <Factory className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
            <span>Verified Manufacturing Infrastructure</span>
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#102B20] tracking-tight leading-tight mb-2">
            See Our Mill Facility &amp; Working Style in Action
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Click on any video below to inspect our automated expeller crushing lines and large-scale godown storage at our Alwar, Rajasthan plants.
          </p>
        </div>

        {/* 2-Column Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-8 max-w-4xl mx-auto">
          {/* Card 1: Facility Oil Processing Equipment */}
          <VideoPlayerCard
            id="video-processing"
            src="/videos/facility-oil-processing.mp4"
            badge="EXPELLER UNIT"
            tag="Extraction Machinery"
            title="Industrial Oil Crushing &amp; Expellers"
            description="Our primary crushing plant operates heavy-duty expellers with automated feed screws and enclosed volumetric channels for cold mechanical extraction."
            icon={<Factory className="w-3.5 h-3.5 text-[#E5A000]" />}
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
            tag="Warehouse &amp; Ready Stocks"
            title="Raw Material &amp; Bagged Storage"
            description="Sanitized, moisture-monitored godowns holding thousands of double-stitched 50 kg gunny bags of graded seeds and cattle feed khali."
            icon={<Warehouse className="w-3.5 h-3.5 text-[#E5A000]" />}
            specs={[
              { label: 'Holding Scale', value: '10,000+ Bags' },
              { label: 'Moisture', value: '< 6.5% Max' },
              { label: 'Dispatches', value: 'Same-Day FTL' }
            ]}
          />
        </div>

        {/* Highlights Banner & Direct Action CTA — Dark Glass */}
        <div className="glass-dark text-[#FFF8E8] rounded-3xl p-6 sm:p-8 border border-white/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="space-y-2 text-center md:text-left max-w-lg">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-[#FAF7EF]/90 font-semibold">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg glass-pill-dark">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5A000] shrink-0" />
                <span>FSSAI Certified Works</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg glass-pill-dark">
                <Scale className="w-3.5 h-3.5 text-[#E5A000] shrink-0" />
                <span>Digital Weighbridge</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg glass-pill-dark">
                <Truck className="w-3.5 h-3.5 text-[#E5A000] shrink-0" />
                <span>All-India Fleet</span>
              </span>
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#FAF7EF]">
              Want to Schedule a Mill Inspection or Place a Bulk Order?
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Distributors and bulk buyers are welcome to tour our Rajasthan mill premises or request batch lab test certificates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/quotation-request"
              className="px-5 py-3 rounded-xl bg-[#E5A000] hover:bg-[#F5C542] text-[#102B20] font-bold text-xs tracking-wide transition shadow-md flex items-center justify-center gap-2 text-center cursor-pointer border border-white/20"
            >
              <span>Request Proforma</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="tel:9057292529"
              className="px-4 py-3 rounded-xl glass-pill-dark hover:bg-black/70 text-[#FAF7EF] font-semibold text-xs tracking-wide transition border border-white/20 flex items-center justify-center gap-2 text-center cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E5A000]" />
              <span>Call Mill Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

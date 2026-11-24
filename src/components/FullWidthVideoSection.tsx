"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface FullWidthVideoSectionProps {
  videoSrc: string;
  posterSrc: string;
  title: string;
  eyebrow?: string;
  description?: string;
  stats?: { label: string; value: string }[];
  accentColor?: "gold" | "blue";
  badges?: string[];
}

export default function FullWidthVideoSection({
  videoSrc,
  posterSrc,
  title,
  eyebrow = "ВИРОБНИЧІ ПОТУЖНОСТІ В РЕАЛЬНОМУ ЧАСІ",
  description,
  stats = [],
  accentColor = "gold",
  badges = ["Фабрика 2 500 м²", "Вінниця, 600-річчя 17", "Власне виробництво"],
}: FullWidthVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: remains paused or muted
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full bg-slate-950 text-white overflow-hidden my-12 sm:my-16 border-y border-gold-400/20 shadow-2xl">
      {/* Background Video Container */}
      <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[660px] overflow-hidden">
        {/* Poster Image while video loads */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <Image
            src={posterSrc}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className="w-full h-full object-cover scale-105 filter brightness-[0.78] contrast-[1.08]"
        />

        {/* Dark Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/30 to-slate-950/80 pointer-events-none" />

        {/* Foreground Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 lg:p-16 max-w-[1520px] mx-auto pointer-events-none">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/20 backdrop-blur-md border border-gold-400/40 text-gold-300 font-sans text-[11px] font-bold tracking-widest uppercase rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                {eyebrow}
              </span>
              {badges.map((b, idx) => (
                <span
                  key={idx}
                  className="hidden sm:inline-block px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-slate-300 font-sans text-[11px] tracking-wider uppercase rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Video Controls */}
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/15 rounded-full p-1">
              <button
                type="button"
                onClick={togglePlay}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={isPlaying ? "Пауза" : "Відтворити"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
              </button>
            </div>
          </div>

          {/* Bottom Title & Stats */}
          <div className="pointer-events-auto max-w-4xl pt-8">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1] drop-shadow-md">
              {title}
            </h2>
            {description && (
              <p className="font-sans text-sm sm:text-base lg:text-lg text-slate-200 mt-4 max-w-2xl font-light leading-relaxed drop-shadow-sm">
                {description}
              </p>
            )}

            {stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/15">
                {stats.map((st, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-gold-300 font-normal tracking-tight">
                      {st.value}
                    </span>
                    <span className="font-sans text-[11px] sm:text-xs text-slate-300 uppercase tracking-wider mt-1">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

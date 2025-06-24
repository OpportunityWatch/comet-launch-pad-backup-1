
import React from 'react';
import { Maximize2, X } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title: string;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  isFullscreen,
  onToggleFullscreen,
  className = ""
}) => {
  return (
    <>
      {/* Regular video container */}
      <div 
        className={`relative rounded-xl overflow-hidden cursor-pointer group shadow-[0_0_30px_rgba(255,242,0,0.3)] hover:shadow-[0_0_40px_rgba(255,242,0,0.5)] transition-all duration-300 border-2 border-yellow-400/30 hover:border-yellow-400/50 ${className}`}
        onClick={onToggleFullscreen}
      >
        <div className="relative" style={{ position: 'relative', aspectRatio: '9/16' }}>
          <iframe 
            loading="lazy" 
            title={title}
            src={src}
            style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          />
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-black/70 transition-colors">
              <Maximize2 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={onToggleFullscreen}
            className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-black/70 transition-colors"
          >
            <X size={24} />
          </button>
          <div className="w-full h-full max-w-md max-h-[90vh] md:max-w-2xl relative">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <iframe 
                loading="lazy" 
                title={`${title} Fullscreen`}
                src={src}
                style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;

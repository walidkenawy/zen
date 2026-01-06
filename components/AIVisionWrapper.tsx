
import React, { useState } from 'react';
import { Wand2, Loader2, RefreshCw } from 'lucide-react';
import { generateSanctuaryVisual } from '../services/geminiService';
import { AspectRatio } from '../types';

interface AIVisionWrapperProps {
  prompt: string;
  fallbackUrl: string;
  aspectRatio?: AspectRatio;
  className?: string;
  overlayClassName?: string;
  priority?: boolean;
}

export const AIVisionWrapper: React.FC<AIVisionWrapperProps> = ({ 
  prompt, 
  fallbackUrl, 
  aspectRatio = "16:9",
  className = "",
  overlayClassName = "",
  priority = false
}) => {
  const [currentUrl, setCurrentUrl] = useState<string>(fallbackUrl);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsGenerating(true);
    // Explicitly cast to AspectRatio to prevent inference issues when passing destructured default values
    const aiUrl = await generateSanctuaryVisual(prompt, aspectRatio as AspectRatio);
    if (aiUrl) {
      setCurrentUrl(aiUrl);
      setHasGenerated(true);
    }
    setIsGenerating(false);
  };

  return (
    <div className={`relative overflow-hidden group/ai ${className}`}>
      <img 
        src={currentUrl} 
        alt={prompt}
        loading={priority ? "eager" : "lazy"}
        className={`w-full h-full object-cover transition-all duration-1000 ${isGenerating ? 'blur-xl scale-110 opacity-50' : 'blur-0 scale-100 opacity-100'} ${hasGenerated ? 'animate-in fade-in zoom-in duration-1000' : ''}`}
      />
      
      {/* AI Action Button */}
      <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover/ai:opacity-100 transition-opacity duration-300 z-20 ${overlayClassName}`}>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-white/20 backdrop-blur-xl border border-white/30 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest hover:bg-white/40 active:scale-95 transition-all shadow-2xl disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Manifesting...
            </>
          ) : hasGenerated ? (
            <>
              <RefreshCw className="w-5 h-5" />
              Regenerate Vision
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              AI Visualize
            </>
          )}
        </button>
      </div>

      {isGenerating && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-md z-10">
          <div className="w-16 h-16 border-4 border-[#7C9070]/30 border-t-[#7C9070] rounded-full animate-spin mb-4"></div>
          <p className="text-white text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Consulting the Oracle...</p>
        </div>
      )}
      
      {hasGenerated && !isGenerating && (
        <div className="absolute top-4 left-4 bg-[#7C9070] text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl animate-in slide-in-from-top-2">
          AI Generated Vision
        </div>
      )}
    </div>
  );
};


import React from 'react';
import { SongAnalysis } from '../types';

interface AnalysisCardProps {
  analysis: SongAnalysis;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-indigo-400 mb-1">
              {analysis.title}
            </h2>
            <p className="text-xl text-slate-400 font-medium">{analysis.artist}</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-300">
              {analysis.genre}
            </span>
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold uppercase tracking-wider">
              {analysis.mood}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
          {/* Lyrics Section */}
          <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800/50">
            <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Lyrics
            </h3>
            <pre className="whitespace-pre-wrap font-sans text-slate-300 leading-relaxed text-lg italic">
              {analysis.lyrics}
            </pre>
          </div>

          {/* Insights Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-3">Themes</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.themes.map((theme, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-slate-300">
                    #{theme}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-3">Musical Context</h3>
              <p className="text-slate-400 leading-relaxed">
                {analysis.musicalAnalysis}
              </p>
            </div>

            <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
              <p className="text-sm text-indigo-300/80">
                AI powered insight extracted from audio-visual temporal patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;

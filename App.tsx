
import React, { useState, useRef } from 'react';
import { analyzeSong } from './services/geminiService';
import { AnalysisState } from './types';
import AnalysisCard from './components/AnalysisCard';

const App: React.FC = () => {
  const [state, setState] = useState<AnalysisState>({
    loading: false,
    error: null,
    data: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset state for new upload
    setState({ loading: true, error: null, data: null });
    
    // Create preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      const analysis = await analyzeSong(file);
      setState({ loading: false, error: null, data: analysis });
    } catch (err) {
      console.error(err);
      setState({
        loading: false,
        error: "Failed to analyze song. Please check your API key and file format.",
        data: null,
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      {/* Header */}
      <header className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          LyricLens
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light">
          Unlock the story behind the sound. Upload a music video or audio file to extract lyrics and deep musical analysis.
        </p>
      </header>

      {/* Main Action Area */}
      <main className="space-y-12">
        {!state.data && !state.loading && (
          <div className="flex flex-col items-center">
            <div 
              onClick={triggerFileInput}
              className="w-full max-w-xl aspect-video md:aspect-[21/9] border-2 border-dashed border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/50 transition-all cursor-pointer rounded-3xl flex flex-col items-center justify-center group"
            >
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <span className="text-slate-300 font-semibold text-lg">Drop your media here</span>
              <span className="text-slate-500 text-sm mt-1">MP4, MP3, MOV (Max 100MB)</span>
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden" 
              accept="video/*,audio/*"
            />
          </div>
        )}

        {/* Loading State */}
        {state.loading && (
          <div className="flex flex-col items-center py-20 space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-500/20 rounded-full animate-ping"></div>
              <div className="absolute inset-0 w-24 h-24 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-200">Decoding the rhythm...</h3>
              <p className="text-slate-500 mt-2">Gemini is analyzing frequencies and vocals</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {state.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center max-w-lg mx-auto">
            {state.error}
            <button 
              onClick={() => setState({ ...state, error: null })}
              className="block mx-auto mt-4 text-sm underline opacity-70 hover:opacity-100"
            >
              Try another file
            </button>
          </div>
        )}

        {/* Analysis Result */}
        {state.data && (
          <div className="space-y-12">
            {previewUrl && (
              <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                <video 
                  src={previewUrl} 
                  controls 
                  className="w-full"
                />
              </div>
            )}
            <AnalysisCard analysis={state.data} />
            <div className="flex justify-center pb-20">
               <button 
                  onClick={() => {
                    setState({ loading: false, error: null, data: null });
                    setPreviewUrl(null);
                  }}
                  className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-full transition-colors font-semibold"
                >
                  Analyze Another Song
                </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-900 pt-8 text-center text-slate-600 text-sm">
        <p>Built with Gemini 3 Pro • Real-time Music Intelligence</p>
      </footer>
    </div>
  );
};

export default App;

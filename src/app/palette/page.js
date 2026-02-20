'use client'
import { useState } from 'react';
import { Search, Copy, Check } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);

  const handleExtract = async (e) => {
    e.preventDefault();
    setLoading(true);
    setColors([]);

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.colors) setColors(data.colors);
    } catch (err) {
      alert('Error fetching colors.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  // The Backend now sorts by "Brand Score", so index 0 is the predicted Primary
  const primaryColor = colors.length > 0 ? colors[0] : null;
  const otherColors = colors.length > 0 ? colors.slice(1) : [];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Palette Scraper</h1>
        <p className="text-gray-500">Paste a URL to extract its visual identity.</p>
      </div>
      <form onSubmit={handleExtract} className="flex w-full max-w-lg shadow-lg rounded-xl overflow-hidden bg-white border border-gray-200 mb-16">
        <input
          type="url"
          required
          placeholder="https://example.com"
          className="flex-1 px-6 py-4 outline-none text-gray-700"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button disabled={loading} className="bg-black text-white px-8 font-medium hover:bg-gray-800 transition disabled:bg-gray-400">
          {loading ? '...' : <Search size={20} />}
        </button>
      </form>

      {colors.length > 0 && (
        <div className="w-full max-w-5xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* PRIMARY COLOR (Winner of the Scoring Algo) */}
          {primaryColor && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                Detected Primary Brand Color
              </h2>
              <div 
                onClick={() => copyToClipboard(primaryColor.hex)}
                className="group relative w-full md:w-1/3 h-48 rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all hover:scale-[1.02] flex flex-col justify-end p-6"
                style={{ backgroundColor: primaryColor.hex }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="bg-black/20 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2">
                     {copied === primaryColor.hex ? <Check size={16}/> : <Copy size={16}/>}
                     {copied === primaryColor.hex ? 'Copied' : 'Copy'}
                   </span>
                </div>
                <span className={`text-3xl font-mono font-bold uppercase tracking-tight ${primaryColor.isDark ? 'text-white' : 'text-black'}`}>
                  {primaryColor.hex}
                </span>
                <span className={`text-sm font-medium opacity-80 ${primaryColor.isDark ? 'text-white' : 'text-black'}`}>
                  Score: {Math.round(primaryColor.score)}
                </span>
              </div>
            </div>
          )}

          {/* PALETTE GRID */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-gray-300 rounded-full"></span>
              Site Palette
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {otherColors.map((color) => (
                <div 
                  key={color.hex}
                  onClick={() => copyToClipboard(color.hex)}
                  className="group relative h-24 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all hover:scale-105 flex flex-col justify-end p-3 border border-black/5"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     {copied === color.hex ? <Check color={color.isDark ? '#FFF' : '#000'} /> : <Copy color={color.isDark ? '#FFF' : '#000'} />}
                  </div>
                  <span className={`text-xs font-mono font-bold uppercase tracking-wide opacity-90 ${color.isDark ? 'text-white' : 'text-black'}`}>
                    {color.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
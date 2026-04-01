"use client";

import { useState } from "react";

export default function NovelWritingPage() {
  const [genre, setGenre] = useState("");
  const [premise, setPremise] = useState("");
  const [characters, setCharacters] = useState("");
  const [tone, setTone] = useState("Mystery");
  const [chapterCount, setChapterCount] = useState("5");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!premise.trim()) {
      setError("Please provide a story premise.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre, premise, characters, tone, chapterCount }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || "No output received.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-950 to-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-violet-300 mb-2">AI Novel Writing</h1>
          <p className="text-slate-400">Craft compelling stories, chapter outlines, and character arcs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-violet-500/20 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-violet-300">Story Parameters</h2>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Genre</label>
              <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="e.g., Fantasy, Thriller, Romance"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
              >
                {["Mystery", "Dark", "Lighthearted", "Epic", "Intimate", "Humorous", "Romantic"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Chapter Count</label>
              <select
                value={chapterCount}
                onChange={(e) => setChapterCount(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
              >
                {[3, 5, 8, 10, 15, 20].map((n) => (
                  <option key={n} value={n}>{n} Chapters</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Story Premise *</label>
              <textarea
                value={premise}
                onChange={(e) => setPremise(e.target.value)}
                placeholder="A detective uncovers a conspiracy in a small coastal town..."
                rows={4}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Characters</label>
              <textarea
                value={characters}
                onChange={(e) => setCharacters(e.target.value)}
                placeholder="Protagonist: Name, background, motivation..."
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {loading ? "Generating..." : "Write Novel Outline"}
            </button>
          </div>

          <div className="bg-slate-900/60 border border-violet-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-violet-300 mb-4">Generated Output</h2>
            {output ? (
              <pre className="text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed max-h-[600px] overflow-y-auto">
                {output}
              </pre>
            ) : (
              <div className="text-slate-500 flex items-center justify-center h-64">
                Your story will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

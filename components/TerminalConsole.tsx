
import React, { useState, useEffect } from 'react';
import { Terminal, Code2 } from 'lucide-react';

export const TerminalConsole: React.FC = () => {
  const [history, setHistory] = useState<{ text: string, color: string, icon?: boolean }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const lines = [
    { text: "import { Open9 } from '@core/engine';", color: "text-purple-400", typing: true },
    { text: "const architect = new Open9.Architect();", color: "text-blue-400", typing: true },
    { text: "", color: "text-white", typing: false },
    { text: "await architect.build({", color: "text-yellow-400", typing: true },
    { text: "  performance: 'ultra-high',", color: "text-cyan-400", typing: true },
    { text: "  security: 'military-grade',", color: "text-cyan-400", typing: true },
    { text: "  scaling: 'autonomous'", color: "text-cyan-400", typing: true },
    { text: "});", color: "text-yellow-400", typing: true },
    { text: "", color: "text-white", typing: false },
    { text: "> System: Deployment successful.", color: "text-green-400 font-bold", typing: false },
    { text: "> Status: ONLINE_V4_PROD", color: "text-[#4fd1c5] font-black mt-4 text-xl animate-pulse", typing: false }
  ];

  useEffect(() => {
    if (isDone) {
      const restartTimeout = setTimeout(() => {
        setHistory([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setIsDone(false);
      }, 8000);
      return () => clearTimeout(restartTimeout);
    }
    if (currentLineIndex >= lines.length) {
      setIsDone(true);
      return;
    }
    const currentLine = lines[currentLineIndex];
    
    if (currentLine.text === "" && !currentLine.typing) {
        setHistory(prev => [...prev, currentLine]);
        setCurrentLineIndex(prev => prev + 1);
        return;
    }

    if (currentLine.typing) {
      if (currentCharIndex < currentLine.text.length) {
        const timeout = setTimeout(() => setCurrentCharIndex(prev => prev + 1), 35);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setHistory(prev => [...prev, currentLine]);
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 500);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setHistory(prev => [...prev, currentLine]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, isDone, lines.length]);

  return (
    <div className="relative z-10 font-mono text-sm md:text-base space-y-1.5 min-h-[320px] p-6 overflow-hidden bg-[#0a192f]/90 rounded-b-[2rem]">
      {history.map((line, index) => (
        <div key={index} className={`${line.color} flex items-start gap-3 animate-in fade-in slide-in-from-left-2 duration-300`}>
          <span className="opacity-20 select-none text-xs mt-1 w-4 text-right">{index + 1}</span>
          <pre className="whitespace-pre-wrap break-all">{line.text}</pre>
        </div>
      ))}
      {!isDone && lines[currentLineIndex] && (
        <div className={`${lines[currentLineIndex].color} flex items-start gap-3`}>
          <span className="opacity-20 select-none text-xs mt-1 w-4 text-right">{currentLineIndex + 1}</span>
          <pre className="whitespace-pre-wrap break-all">
            {lines[currentLineIndex].typing ? lines[currentLineIndex].text.substring(0, currentCharIndex) : ""}
            <span className="w-2 h-5 bg-[#4fd1c5] animate-pulse inline-block ml-1 align-middle"></span>
          </pre>
        </div>
      )}
    </div>
  );
};

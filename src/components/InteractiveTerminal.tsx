'use client';

import React, { useState, useEffect, useRef } from "react";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "system";
}

interface InteractiveTerminalProps {
  isDark: boolean;
}

export default function InteractiveTerminal({ isDark }: InteractiveTerminalProps) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "SYSTEM INIT: AYOMIDE_OS v1.2.0", type: "system" },
    { text: "Type 'help' to see list of available commands.", type: "system" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  // Auto scroll to bottom of the terminal logs internally (no page scrolling)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      timerRefs.current.forEach(clearTimeout);
    };
  }, []);

  const clearTimers = () => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  };

  // Keep focus on input when clicking terminal area
  const focusInput = () => {
    if (!isConnecting && !isPrinting) {
      inputRef.current?.focus();
    }
  };

  // Typewriter helper for command outputs
  const printLines = (lines: TerminalLine[], delay: number = 80) => {
    setIsPrinting(true);
    lines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setHistory((prev) => [...prev, line]);
        if (index === lines.length - 1) {
          setIsPrinting(false);
          // Recenter focus after rendering completes
          setTimeout(() => inputRef.current?.focus(), 50);
        }
      }, (index + 1) * delay);
      timerRefs.current.push(timer);
    });
  };

  const executeCommand = (commandStr: string) => {
    const cmd = commandStr.trim().toLowerCase();
    if (!cmd) return;

    clearTimers();

    // Append command to log history immediately
    setHistory((prev) => [...prev, { text: `ayomide ~ % ${commandStr}`, type: "input" }]);

    if (cmd === "help") {
      const lines: TerminalLine[] = [
        { text: "Available commands:", type: "system" },
        { text: "  help      - Show this manual", type: "output" },
        { text: "  status    - Print current availability and focus", type: "output" },
        { text: "  scan      - Run system diagnostics", type: "output" },
        { text: "  skills    - Print tech stack details", type: "output" },
        { text: "  projects  - List highlight showcase projects", type: "output" },
        { text: "  sudo hire-me - Initiate contact handshake protocol", type: "output" },
        { text: "  clear     - Clean the screen logs", type: "output" }
      ];
      printLines(lines);
    } else if (cmd === "status") {
      const lines: TerminalLine[] = [
        { text: "STATUS DIRECTIVE:", type: "system" },
        { text: "  Role: Frontend Developer", type: "output" },
        { text: "  Availability: ● OPEN TO OPPORTUNITIES", type: "output" },
        { text: "  Location: Nigeria (GMT+1)", type: "output" },
        { text: "  Focus: Web accessibility, high-fidelity UI transitions, Next.js optimization", type: "output" }
      ];
      printLines(lines);
    } else if (cmd === "scan") {
      setIsPrinting(true);
      setHistory((prev) => [
        ...prev,
        { text: "Initiating system diagnostic scan...", type: "system" }
      ]);

      const diagnosticSteps = [
        "Analyzing component trees... [OK]",
        "Verifying Tailwind configuration... [OK]",
        "Checking GSAP timeline allocations... [OK]",
        "Syncing dark/light mode configurations... [OK]",
        "Scan complete: System optimal."
      ];

      diagnosticSteps.forEach((step, idx) => {
        const timer = setTimeout(() => {
          setHistory((prev) => [...prev, { text: `[SYS] ${step}`, type: idx === 4 ? "system" : "output" }]);
          if (idx === diagnosticSteps.length - 1) {
            setIsPrinting(false);
            setTimeout(() => inputRef.current?.focus(), 50);
          }
        }, (idx + 1) * 300);
        timerRefs.current.push(timer);
      });
    } else if (cmd === "skills") {
      const lines: TerminalLine[] = [
        { text: "TECHNICAL SYSTEM MODULES:", type: "system" },
        { text: "  - Languages: JavaScript, TypeScript, HTML5, CSS3", type: "output" },
        { text: "  - Frameworks: React, Next.js, Framer Motion", type: "output" },
        { text: "  - Styles & Layout: Tailwind CSS, CSS Variables, ShadCN UI", type: "output" },
        { text: "  - Animation Engine: GSAP (Timeline, ScrollTrigger, TextPlugin, MotionPath)", type: "output" },
        { text: "  - Backend Integrations: Supabase, Appwrite, Firebase", type: "output" }
      ];
      printLines(lines);
    } else if (cmd === "projects") {
      const lines: TerminalLine[] = [
        { text: "SYSTEM_BUILD_LOG:", type: "system" },
        { text: "  1. ZeroHunger App - Food donation & real-time pickup mapping (Next.js + Supabase)", type: "output" },
        { text: "  2. JobConnect - Job post board & listings aggregator (Next.js + Appwrite)", type: "output" },
        { text: "  3. Admin Dashboard - System telemetry visualizer (Next.js + Chart.js)", type: "output" },
        { text: "  4. Degen Cyberlab - Ultra-modern dark tech landing layout (Next.js + Framer Motion)", type: "output" },
        { text: "  Use 'sudo hire-me' to contact me and collaborate on one of these!", type: "system" }
      ];
      printLines(lines);
    } else if (cmd === "sudo hire-me" || cmd === "hire-me" || cmd === "contact") {
      setIsConnecting(true);
      setHistory((prev) => [
        ...prev,
        { text: "[SYS] Initializing contact handshake connection...", type: "system" }
      ]);

      const logSequence = [
        "Escalating privileges to root...",
        "Creating port socket connection target: #contact",
        "Handshake completed successfully.",
        "Executing page transition protocol... GOODBYE!"
      ];

      logSequence.forEach((line, idx) => {
        const timer = setTimeout(() => {
          setHistory((prev) => [...prev, { text: `[SYS] ${line}`, type: idx === 3 ? "system" : "output" }]);
          if (idx === logSequence.length - 1) {
            setIsConnecting(false);
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }
        }, (idx + 1) * 400);
        timerRefs.current.push(timer);
      });
    } else if (cmd === "clear") {
      setHistory([]);
    } else {
      const lines: TerminalLine[] = [
        { text: `ayomide-os: command not found: ${commandStr}. Type 'help' for help.`, type: "error" }
      ];
      printLines(lines, 50);
    }

    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
    }
  };

  const handleChipClick = (command: string) => {
    if (isConnecting || isPrinting) return;
    executeCommand(command);
  };

  return (
    <div className="flex flex-col w-full max-w-lg">
      {/* Terminal Screen Box */}
      <div
        ref={containerRef}
        onClick={focusInput}
        className={`w-full h-80 rounded-t-2xl border backdrop-blur-xl shadow-2xl p-5 text-left font-mono text-xs md:text-sm leading-relaxed overflow-y-auto cursor-text select-text ${
          isDark
            ? "bg-slate-950/85 border-slate-800/80 shadow-blue-500/5 text-slate-300"
            : "bg-white/80 border-slate-200/80 shadow-slate-200/50 text-slate-700"
        }`}
      >
        {/* Terminal Header Tabs */}
        <div className="flex gap-1.5 mb-4 border-b border-slate-200/10 dark:border-slate-800/40 pb-2.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          <span className={`ml-2 text-xs select-none ${isDark ? "text-slate-500" : "text-slate-400"}`}>ayomide.sh</span>
        </div>

        {/* Console Logs */}
        <div className="space-y-2 select-text">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`${
                line.type === "input"
                  ? "text-blue-500 font-semibold"
                  : line.type === "error"
                  ? "text-red-400"
                  : line.type === "system"
                  ? "text-emerald-500"
                  : isDark
                  ? "text-slate-300"
                  : "text-slate-600"
              }`}
            >
              {line.text}
            </div>
          ))}
          {/* Active input row */}
          {!isConnecting && (
            <div className="flex items-center text-blue-500 font-semibold">
              <span className="mr-1.5 select-none">ayomide ~ %</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none flex-1 font-mono text-xs md:text-sm text-inherit focus:ring-0 p-0"
                style={{ caretColor: "#3b82f6" }}
                disabled={isConnecting || isPrinting}
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {/* Suggestion Commands Area */}
      <div
        className={`w-full p-4 rounded-b-2xl border-x border-b flex flex-wrap gap-2 text-xs font-mono justify-center ${
          isDark
            ? "bg-slate-900/90 border-slate-800/80 text-slate-400"
            : "bg-slate-50/90 border-slate-200/80 text-slate-500"
        }`}
      >
        <span className="w-full text-center mb-1 text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 select-none">
          Quick Commands Deck
        </span>
        {["help", "status", "scan", "skills", "projects", "sudo hire-me", "clear"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleChipClick(cmd)}
            disabled={isConnecting || isPrinting}
            className={`px-3 py-1.5 rounded-md border font-medium transition-all duration-200 select-none ${
              cmd === "sudo hire-me"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                : isDark
                ? "bg-slate-950/40 border-slate-800 hover:bg-slate-800/60 hover:text-white"
                : "bg-white border-slate-200 hover:bg-slate-100 hover:text-slate-900"
            } disabled:opacity-40 disabled:pointer-events-none`}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

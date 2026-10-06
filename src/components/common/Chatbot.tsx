'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Sparkles, RefreshCw } from 'lucide-react';

interface ChatbotProps {
  agentId?: string;
  apiKey?: string;
  name?: string;
}

export default function Chatbot({
  agentId = '7ae4c13b-197b-409a-8301-13ac08fed72c',
  apiKey = 'ee5fc4db-02da-4041-939f-2a758fb613f6',
  name = 'Voyanta AI Concierge',
}: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Expose global DagsisChat object for backwards/script compatibility
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).DagsisChat = {
        init: () => {},
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((prev) => !prev),
      };
    }
  }, []);

  const embedUrl = `https://dagsis.ai/embed/${agentId}?name=${encodeURIComponent(name)}#apiKey=${encodeURIComponent(apiKey)}`;

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end">
        {/* Concierge pill badge */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            onClick={() => setIsOpen(true)}
            className="mb-3 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary-dark/95 border border-luxury/50 backdrop-blur-md shadow-2xl text-xs font-sans text-voyanta-sand cursor-pointer hover:border-luxury hover:scale-105 transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium group-hover:text-luxury transition-colors">
              Chat with Voyanta AI Concierge
            </span>
          </motion.div>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close AI Chat' : 'Open AI Chat'}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'bg-primary-dark border-2 border-luxury text-luxury rotate-90 scale-95'
              : 'bg-primary border-2 border-luxury/80 text-white hover:border-luxury hover:scale-105'
          }`}
          whileTap={{ scale: 0.92 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-luxury" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-luxury" />
              <Sparkles className="w-3.5 h-3.5 text-luxury absolute -top-1 -right-1 animate-pulse" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[99999] w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[calc(100vh-120px)] bg-voyanta-bg rounded-2xl border border-luxury/30 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary-dark border-b border-luxury/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary border border-luxury/40 flex items-center justify-center text-luxury">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-editorial text-sm font-semibold text-white tracking-wide">
                    Voyanta AI Concierge
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-luxury">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live 24/7 Singapore Assistant</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIframeKey((prev) => prev + 1)}
                  title="Reload Chat"
                  className="p-1.5 text-voyanta-sand/70 hover:text-luxury rounded-lg hover:bg-white/5 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="p-1.5 text-voyanta-sand/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live Chat Iframe */}
            <div className="flex-1 w-full h-full bg-white relative">
              <iframe
                key={iframeKey}
                src={embedUrl}
                allow="clipboard-write"
                title="Voyanta AI Chatbot"
                className="w-full h-full border-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import Script from 'next/script';

declare global {
  interface Window {
    DagsisChat?: any;
  }
}

export default function Chatbot() {
  return (
    <Script
      src="https://dagsis.ai/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        if (typeof window !== 'undefined' && window.DagsisChat) {
          window.DagsisChat.init({
            agentId: 'aae5b72d-f5fb-4e71-9d8b-6f0501db8027',
            apiKey: 'fd1fea0d-065a-4cfe-8a6c-6b8f2f64b18a'
          });
        }
      }}
    />
  );
}

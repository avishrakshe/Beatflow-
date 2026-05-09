'use client';

import { useMemo } from 'react';

export default function SolanaMobileDeepLinks() {
  const links = useMemo(() => {
    if (typeof window === 'undefined') {
      return { phantom: '#', backpack: '#', solflare: '#' };
    }

    const url = encodeURIComponent(window.location.href);
    return {
      phantom: `https://phantom.app/ul/browse/${url}?ref=beatflow`,
      backpack: `https://backpack.app/ul/v1/browser?url=${url}`,
      solflare: `https://solflare.com/ul/v1/browse/${url}?cluster=devnet`,
    };
  }, []);

  return (
    <div className="md:hidden border-b border-dark-border bg-dark-surface/90">
      <div className="px-3 py-2 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <span className="text-[10px] text-gray-500 whitespace-nowrap">Open in wallet:</span>
        <a href={links.phantom} className="btn-ghost !px-2 !py-1 !text-[11px] whitespace-nowrap">
          Phantom
        </a>
        <a href={links.backpack} className="btn-ghost !px-2 !py-1 !text-[11px] whitespace-nowrap">
          Backpack
        </a>
        <a href={links.solflare} className="btn-ghost !px-2 !py-1 !text-[11px] whitespace-nowrap">
          Solflare
        </a>
      </div>
    </div>
  );
}


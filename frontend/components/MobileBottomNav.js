'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Music2, TrendingUp, Users, User, Layers } from 'lucide-react';

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/discover', label: 'Discover', icon: Layers },
  { href: '/marketplace', label: 'Market', icon: Music2 },
  { href: '/trading', label: 'Trade', icon: TrendingUp },
  { href: '/community', label: 'Talk', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-dark-border bg-dark-surface/95 backdrop-blur-xl pb-safe">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-lg py-2 ${
                active ? 'text-white bg-dark-hover' : 'text-gray-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


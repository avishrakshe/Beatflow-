// Generic section to render a row or grid of BeatCard items
'use client';

import { motion } from 'framer-motion';
import BeatCard from './BeatCardMarketplace';

export default function BeatGridSection({
  title,
  subtitle,
  layout = 'grid', // 'grid' | 'row'
  beats = [],
  onSelectBeat,
  selectedBeatId,
}) {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        <button className="text-xs text-slate-400 hover:text-slate-200">
          View all
        </button>
      </div>

      {layout === 'row' ? (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {beats.map((beat, index) => (
            <motion.div
              key={beat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <BeatCard
                beat={beat}
                isActive={selectedBeatId === beat.id}
                onSelect={() => onSelectBeat?.(beat)}
                size="md"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {beats.map((beat, index) => (
            <motion.div
              key={beat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <BeatCard
                beat={beat}
                isActive={selectedBeatId === beat.id}
                onSelect={() => onSelectBeat?.(beat)}
                size="lg"
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}



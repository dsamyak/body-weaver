import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { bodyPartsData, bodySystems } from '@/data/bodyParts';

interface BodyPartListProps {
  selectedPart: string | null;
  hoveredPart: string | null;
  activeSystem: string;
  onSelectPart: (id: string) => void;
  onHoverPart: (id: string | null) => void;
  onSetSystem: (system: string) => void;
}

const BodyPartList = ({ selectedPart, hoveredPart, activeSystem, onSelectPart, onHoverPart, onSetSystem }: BodyPartListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredParts = bodyPartsData.filter(p => {
    const matchesSystem = activeSystem === 'all' || p.system.includes(activeSystem);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSystem && matchesSearch;
  });

  return (
    <div className="w-80 glass-panel border-r border-border/50 flex flex-col h-full rounded-tr-3xl rounded-br-3xl overflow-hidden shadow-2xl">
      <div className="p-5 border-b border-white/5 bg-black/20">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">Anatomy Explorer</h1>
        <p className="text-xs text-muted-foreground font-medium mt-1">Interactive 3D Human Body System</p>
      </div>

      <div className="p-4 border-b border-white/5 bg-black/10">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anatomy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
          />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 mb-3 px-1">Body Systems</p>
        <div className="flex flex-wrap gap-2">
          {bodySystems.map(sys => (
            <button
              key={sys.id}
              onClick={() => onSetSystem(sys.id)}
              className="relative px-3 py-1.5 text-[11px] font-medium rounded-full transition-all group overflow-hidden"
            >
              <div className={`absolute inset-0 transition-opacity ${activeSystem === sys.id ? 'bg-primary opacity-100' : 'bg-white/5 opacity-0 group-hover:opacity-100'}`} />
              <span className={`relative z-10 ${activeSystem === sys.id ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`}>
                {sys.name}
              </span>
              {activeSystem === sys.id && (
                <motion.div
                  layoutId="activeSystem"
                  className="absolute inset-0 rounded-full border border-primary pointer-events-none"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
        {filteredParts.map(part => (
          <motion.button
            key={part.id}
            onClick={() => onSelectPart(part.id)}
            onMouseEnter={() => onHoverPart(part.id)}
            onMouseLeave={() => onHoverPart(null)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-3 relative group overflow-hidden ${
              selectedPart === part.id
                ? 'bg-primary/20 text-foreground border border-primary/50 shadow-[0_0_15px_rgba(var(--glow-primary),0.3)]'
                : hoveredPart === part.id
                ? 'bg-white/10 text-foreground border border-white/10'
                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground border border-transparent'
            }`}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {selectedPart === part.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl" />
            )}
            <span
              className={`w-3 h-3 rounded-full shrink-0 shadow-sm transition-transform ${selectedPart === part.id ? 'scale-110 shadow-[0_0_8px_currentColor]' : ''}`}
              style={{ backgroundColor: part.color, color: part.color }}
            />
            <span className="truncate font-medium">{part.name}</span>
          </motion.button>
        ))}
        {filteredParts.length === 0 && (
          <div className="text-center p-6 text-muted-foreground text-sm">
            No anatomy parts found.
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <p className="text-[10px] uppercase font-bold tracking-widest text-primary/70 text-center animate-pulse">
          Select or drag to interact
        </p>
      </div>
    </div>
  );
};

export default BodyPartList;

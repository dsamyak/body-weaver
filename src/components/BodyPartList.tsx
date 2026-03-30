import { motion } from 'framer-motion';
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
  const filteredParts = activeSystem === 'all'
    ? bodyPartsData
    : bodyPartsData.filter(p => p.system.includes(activeSystem));

  return (
    <div className="w-72 bg-card/80 backdrop-blur-xl border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-bold text-foreground tracking-tight">Anatomy Explorer</h1>
        <p className="text-xs text-muted-foreground mt-1">Interactive 3D Human Body</p>
      </div>

      <div className="p-3 border-b border-border">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-1">Body Systems</p>
        <div className="flex flex-wrap gap-1.5">
          {bodySystems.map(sys => (
            <button
              key={sys.id}
              onClick={() => onSetSystem(sys.id)}
              className={`px-2.5 py-1 text-[11px] rounded-full border transition-all ${
                activeSystem === sys.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
              }`}
            >
              {sys.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {filteredParts.map(part => (
          <motion.button
            key={part.id}
            onClick={() => onSelectPart(part.id)}
            onMouseEnter={() => onHoverPart(part.id)}
            onMouseLeave={() => onHoverPart(null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2.5 ${
              selectedPart === part.id
                ? 'bg-primary/15 text-foreground border border-primary/30'
                : hoveredPart === part.id
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent'
            }`}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.15 }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 border border-border"
              style={{ backgroundColor: part.color }}
            />
            <span className="truncate">{part.name}</span>
          </motion.button>
        ))}
      </div>

      <div className="p-3 border-t border-border">
        <p className="text-[10px] text-muted-foreground text-center">
          Click a body part or drag to rotate
        </p>
      </div>
    </div>
  );
};

export default BodyPartList;

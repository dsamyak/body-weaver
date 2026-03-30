import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Bone, Heart, Wind, Brain, Eye } from 'lucide-react';
import { BodyPartData } from '@/data/bodyParts';

interface BodyPartPanelProps {
  part: BodyPartData | null;
  onClose: () => void;
}

const systemIcons: Record<string, React.ReactNode> = {
  Skeletal: <Bone className="w-4 h-4" />,
  Cardiovascular: <Heart className="w-4 h-4" />,
  Respiratory: <Wind className="w-4 h-4" />,
  Nervous: <Brain className="w-4 h-4" />,
  Sensory: <Eye className="w-4 h-4" />,
};

const BodyPartPanel = ({ part, onClose }: BodyPartPanelProps) => {
  return (
    <AnimatePresence>
      {part && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute top-4 right-4 w-80 bg-card/90 backdrop-blur-xl border border-border rounded-xl p-5 shadow-2xl z-10"
        >
          <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            {systemIcons[part.system] || <Activity className="w-4 h-4 text-primary" />}
            <span className="text-xs uppercase tracking-widest text-primary font-medium">{part.system}</span>
          </div>

          <h2 className="text-lg font-bold text-foreground mb-2">{part.name}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{part.description}</p>

          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest text-primary font-medium mb-2">Key Facts</h3>
            {part.details.map((detail, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-2 text-sm text-secondary-foreground"
              >
                <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                {detail}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BodyPartPanel;

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
          initial={{ opacity: 0, x: 40, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: 40, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute top-6 right-6 w-96 glass-panel rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-xl -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-lg -z-10 -translate-x-1/2 translate-y-1/2" />
          
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full backdrop-blur-md">
            <X className="w-4 h-4" />
          </button>

          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-2"
          >
            <div className="p-1.5 rounded-md bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(var(--glow-primary),0.3)]">
              {systemIcons[part.system] || <Activity className="w-4 h-4" />}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary/90">{part.system}</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.15 }}
            className="text-2xl font-bold text-white mb-3 tracking-tight"
          >
            {part.name}
          </motion.h2>
          
          <div className="overflow-y-auto max-h-[55vh] pr-2 pb-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="text-sm text-foreground/80 leading-relaxed mb-5 font-medium"
            >
              {part.description}
            </motion.p>

            {part.theory && (
              <motion.div
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.22 }}
                className="text-sm text-foreground/90 leading-relaxed mb-6 pl-4 py-3 border-l-2 border-primary/60 bg-primary/10 rounded-r-xl"
              >
                {part.theory}
              </motion.div>
            )}

            <div className="space-y-3">
              <motion.h3 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.25 }}
                className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted-foreground mb-3 flex items-center gap-2"
              >
                <span className="bg-white/10 h-px flex-1" />
                Key Facts
                <span className="bg-white/10 h-px flex-1" />
              </motion.h3>
              
              {part.details.map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                  className="flex items-start gap-3 text-sm text-foreground/90 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors group"
                >
                  <div className="mt-1 relative">
                    <span className="block w-1.5 h-1.5 rounded-full bg-primary/80 group-hover:scale-125 transition-transform" />
                    <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-primary/40 animate-ping" />
                  </div>
                  <span className="leading-snug">{detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BodyPartPanel;

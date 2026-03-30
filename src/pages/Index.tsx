import { useState, useCallback } from 'react';
import HumanBodyScene from '@/components/HumanBodyScene';
import BodyPartPanel from '@/components/BodyPartPanel';
import BodyPartList from '@/components/BodyPartList';
import { bodyPartsData } from '@/data/bodyParts';

const Index = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [activeSystem, setActiveSystem] = useState('all');

  const handleSelectPart = useCallback((id: string) => {
    setSelectedPart(prev => prev === id ? null : id || null);
  }, []);

  const selectedData = bodyPartsData.find(p => p.id === selectedPart) ?? null;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <BodyPartList
        selectedPart={selectedPart}
        hoveredPart={hoveredPart}
        activeSystem={activeSystem}
        onSelectPart={handleSelectPart}
        onHoverPart={setHoveredPart}
        onSetSystem={setActiveSystem}
      />
      <div className="flex-1 relative">
        <HumanBodyScene
          selectedPart={selectedPart}
          hoveredPart={hoveredPart}
          activeSystem={activeSystem}
          onSelectPart={handleSelectPart}
          onHoverPart={setHoveredPart}
        />
        <BodyPartPanel part={selectedData} onClose={() => setSelectedPart(null)} />

        {hoveredPart && !selectedPart && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-lg border border-border px-4 py-2 rounded-full text-sm text-foreground shadow-lg">
            {bodyPartsData.find(p => p.id === hoveredPart)?.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

interface SequencerGridProps {
  sequence: boolean[];
  currentStep: number;
  onToggleStep: (step: number) => void;
  notes: string[];
}

const SequencerGrid = ({
  sequence,
  currentStep,
  onToggleStep,
  notes,
}: SequencerGridProps) => {
  return (
    <div className="grid grid-cols-8 gap-2 mb-6">
      {sequence.map((isActive, index) => (
        <button
          key={index}
          onClick={() => onToggleStep(index)}
          className={`
            w-full aspect-square rounded-md border-2 transition-all duration-150 relative
            ${
              isActive
                ? "bg-acid-green border-acid-green"
                : "bg-transparent border-acid-green/30 hover:border-acid-green/60"
            }
            ${currentStep === index ? "shadow-lg shadow-acid-green/50" : ""}
          `}
        >
          {isActive && (
            <span className="absolute inset-0 flex items-center justify-center text-black text-xs font-mono">
              {notes[index]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default SequencerGrid;
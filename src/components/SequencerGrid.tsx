interface SequencerGridProps {
  sequence: boolean[];
  currentStep: number;
  onToggleStep: (step: number) => void;
}

const SequencerGrid = ({
  sequence,
  currentStep,
  onToggleStep,
}: SequencerGridProps) => {
  return (
    <div className="grid grid-cols-8 gap-2 mb-6">
      {sequence.map((isActive, index) => (
        <button
          key={index}
          onClick={() => onToggleStep(index)}
          className={`
            w-full aspect-square rounded-md border-2 transition-all duration-150
            ${
              isActive
                ? "bg-acid-green border-acid-green"
                : "bg-transparent border-acid-green/30 hover:border-acid-green/60"
            }
            ${currentStep === index ? "shadow-lg shadow-acid-green/50" : ""}
          `}
        />
      ))}
    </div>
  );
};

export default SequencerGrid;
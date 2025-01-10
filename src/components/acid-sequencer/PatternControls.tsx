import { Step } from "./types";
import { SCALES } from "./scales";
import ScaleSelector from "./ScaleSelector";
import NoteSelector from "./NoteSelector";
import SequencerGrid from "../SequencerGrid";

interface PatternControlsProps {
  sequence: Step[];
  currentStep: number;
  currentScale: string;
  currentNote: string;
  onScaleChange: (scale: string) => void;
  onNoteChange: (note: string) => void;
  onToggleStep: (step: number) => void;
}

const PatternControls = ({
  sequence,
  currentStep,
  currentScale,
  currentNote,
  onScaleChange,
  onNoteChange,
  onToggleStep,
}: PatternControlsProps) => {
  return (
    <div>
      <div className="flex gap-4">
        <ScaleSelector currentScale={currentScale} onScaleChange={onScaleChange} />
        <NoteSelector
          currentNote={currentNote}
          onNoteChange={onNoteChange}
          notes={SCALES[currentScale].notes}
        />
      </div>

      <SequencerGrid
        sequence={sequence.map((s) => s.active)}
        currentStep={currentStep}
        onToggleStep={onToggleStep}
        notes={sequence.map((s) => s.note)}
      />
    </div>
  );
};

export default PatternControls;